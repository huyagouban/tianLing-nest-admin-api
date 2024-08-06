import { Injectable, HttpStatus, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/user.role.entity";
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { AjaxResult } from "../../../common/ajaxResult";
import { Like, Repository, Between, In, EntityManager } from 'typeorm';
import { ListUserDto } from "./dto/list-user.dto";
import { PaginationService } from "../../../utils/PaginationResult/paginationResult.utils";
import { DownloadExcelService } from "../../../utils/ExcelService/ExcelService.utils";
import { PasswordUtils } from "../../../utils/password/password.utils";
import * as fs from 'fs-extra';
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { isEmpty, } from 'class-validator'
import { IdentityUtils } from "src/utils/security/identity.utils";
import { UserConstants } from "src/common/constants/user.constants";
import { RoleService } from "../role/role.service";
import { LoginUser } from "src/common/class/sys-login-user";
import { MenuService } from "../menu/menu.service";
declare interface Buffer extends ArrayBuffer { }
const excelHeader = [
  '用户昵称', '用户手机', '邮箱', '性别（男、女）', '用户名称', '用户密码', '用户状态(正常、停用)', '头像地址', '备注',
]

const importExcelHeader = [
  'nickName', 'phoneNumber', 'email', 'sex', 'userName', 'password', 'status', 'avatar', 'remark',
]

/**
 * 用户管理
 */
@Injectable()
export class UserService {
  /**创建用户 */
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(UserRole) private userRole: Repository<UserRole>,

    private roleService: RoleService,
    private menuService: MenuService,
  ) { } // 注入User实体类的Repository
  async create(user: CreateUserDto): Promise<void> {
    const { roleIds, ...userInfo } = user
    await this.entityManager.transaction(async manager => {
      // 新增角色信息
      userInfo.password = await PasswordUtils.create(userInfo.password) as unknown as string;
      const result = await manager.insert(User, userInfo)
      const userId = result.identifiers[0].userId

      // 新增角色与菜单关联
      if (!isEmpty(roleIds)) {
        await manager.insert(
          UserRole,
          { userId, roleIds }
        )
      }
    })
  }
  /**用户列表 */
  async findAll(query: ListUserDto) {
    let endTime;
    // 判断是否传了创建时间区间
    if (query.startAndEndTime) {
      endTime = new Date(query.startAndEndTime[1])
    }
    // 置顶ID
    const toUserId = 1;
    const paginationService = new PaginationService<User>(
      this.user,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          phoneNumber: Like(`%${query.phoneNumber ? query.phoneNumber : ''}%`),
          userName: Like(`%${query.userName ? query.userName : ''}%`),
          status: Like(`%${query.status ? query.status : ''}%`),
          createDate: query.startAndEndTime ? Between(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
        },],
        order: {
          createDate: "ASC",
        }
      },
    });

    return AjaxResult.success(res);
  }
  /**用户详情 */
  async findOne(userId: number) {
    const user = await this.user.findOne({
      //Like  模糊查询
      // 查询
      where: {
        userId: userId,
      }
    })
    const roleIds = await this.userRole.find({
      where: {
        userId: userId
      }
    })
    /** 由于绑定用户的角色是数组，所以需要将数组转换为字符串再转换为数字 */
    return AjaxResult.success({ ...user, roleIds: Number(roleIds.map(item => item.roleIds).toString()) })
  }
  /**修改用户 */
  async update(userId: number, updateUserDto: UpdateUserDto) {
    let updateUserOption = {
      ...updateUserDto,
      updateDate: new Date()
    }
    if (updateUserDto.password) {
      updateUserOption.password = await PasswordUtils.create(updateUserOption.password) as unknown as string;
    }
    const { roleIds, ...userInfo } = updateUserOption
    await this.entityManager.transaction(async manager => {
      // 修改角色信息
      await manager.update(User, userId, userInfo)
      // 删除并新增角色与菜单关联
      await manager.delete(UserRole, { userId })
      if (!isEmpty(roleIds)) {
        await manager.insert(
          UserRole,
          { userId, roleIds }
        )
      }

    })
  }
  /**删除用户 */
  async remove(userId: number | number[]) {
    const data = await this.user.delete(userId)

    return AjaxResult.success(data, '删除成功', true)
  }

  /**导出excel */
  async downloadExcel(userId: number[]): Promise<AjaxResult> {
    /**
     * 1.查询数据
     * 2.导出excel
     */
    const list = await this.user.find({
      where: {
        userId: In(userId)
      }
    })
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.userId
      item.sex = item.sex === '1' ? '男' : item.sex === '1' ? '女' : ''
      item.status = item.status === '1' ? '正常' : '停用'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()


    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量用户导出')

    return AjaxResult.success(excelFile)
  }
  /** 下载模板 */

  async downloadExcelTemlate(): Promise<AjaxResult> {
    const excelService = new DownloadExcelService()
    const excelFile = await excelService.exportDataToExcel([], 'Sheet1', excelHeader, '批量用户导入模板')
    return AjaxResult.success(excelFile)
  }
  /** 导入excel */
  async importExcel(file: Express.Multer.File): Promise<AjaxResult> {
    try {
      // 确保文件是Excel文件
      if (!file.originalname.endsWith('.xlsx') && !file.originalname.endsWith('.xls')) {
        AjaxResult.error('请上传excel文件');
      }
      // 将上传的文件临时保存到磁盘
      const tempFilePath = `./uploads/files/${file.originalname}`;
      await fs.move(file.path, tempFilePath);
      // 导入Excel数据
      const excelService = new DownloadExcelService()
      const result = await excelService.importExcel(tempFilePath);

      // 处理数据或保存到数据库...
      const importExcelList = result.map(item => {
        return {
          nickName: item[0],
          phoneNumber: item[1],
          email: item[2].text ? item[2].text : item[2],
          sex: item[3] === '男' ? '1' : item[3] === '女' ? '0' : item[4],
          userName: item[4],
          password: item[5],
          status: item[6] === '正常' ? '1' : item[6] === '停用' ? '0' : '',
          remark: item[7],
        }
      })
      const data = await this.user.save(importExcelList)
      // 清理临时文件（根据实际情况调整）
      await fs.remove(tempFilePath);
      return AjaxResult.success();

    } catch (error) {
      return AjaxResult.error(error.message);
    }
  }
  /**
* 校验角色名称是否唯一
* @param user 角色信息
* @returns true 唯一 / false 不唯一
*/
  async checkUserNameUnique(user: Partial<User>): Promise<boolean> {
    const res = await this.user.findOne({
      where: {
        userName: Like(`%${user.userName ? user.userName : ''}%`),
        userId: user.userId ? user.userId : undefined
      }
    })

    if (res && res.userId !== user.userId) {
      return false
    }
    return true
  }
  /**
   * 
   * @param jwtKey jwt token解析后的令牌
   * @returns 获取用户登录所需信息
   */
  async loginUserInfo(jwtKey: JwtToken) {
    const user = await this.user.findOne({
      where: {
        userId: jwtKey.userId
      }
    })
    const roles = await this.getRolePermission(jwtKey.userId)
    const permissions = await this.getMenuPermission(jwtKey.userId)
    const loginUser = new LoginUser()
    loginUser.user = user;
    loginUser.roles = roles
    loginUser.permissions = permissions
    return loginUser
  }

  /**
  * 获取角色数据权限
  * @param userId 用户Id
  * @return 角色权限信息
  */
  async getRolePermission(userId: number): Promise<string[]> {
    if (IdentityUtils.isAdminUser(userId)) {
      return [UserConstants.SUPER_ROLE_CODE]
    } else {
      const roles = await this.roleService.selectRoleByUserId(userId)
      return roles.map((role) => role.roleKey).filter(Boolean)
    }
  }
  /**
   * 获取菜单数据权限
   * @param userId 用户Id
   * @return 菜单权限信息
   */
  async getMenuPermission(userId: number): Promise<string[]> {
    if (IdentityUtils.isAdminUser(userId)) {
      return [UserConstants.SUPER_ROLE_PERMISSION]
    } else {
      const menus = await this.menuService.selectMenuByUserId(userId)
      return menus.map((menu) => menu.perms).filter(Boolean)
    }
  }
  /**
   * 根据用户Id查询用户信息
   * @param userId 用户Id
   * @returns 用户信息
   */
  async selectUserByUserId(userId: number): Promise<User> {
    return await this.user.findOne({
      where: {
        userId
      }
    })
  }

  /**
   * 更新用户基本信息
   * @param user 用户信息
   */
  async updateBasicInfo(user: Partial<User>): Promise<void> {
    await this.user.update(user.userId, user)
  }
}

