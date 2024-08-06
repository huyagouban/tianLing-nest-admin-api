import { Injectable } from '@nestjs/common';
import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Role } from "./entities/role.entity";
import { RoleMenu } from "./entities/role.menu.entity";
import { isEmpty, } from 'class-validator'
import { Repository, EntityManager, Like, Between, In } from 'typeorm';
import { PaginationService } from "src/utils/PaginationResult/paginationResult.utils";
import { AjaxResult } from 'src/common/ajaxResult';
import { RoleInfoVo } from "./vo/role.vo";
import { DownloadExcelService } from "src/utils/ExcelService/ExcelService.utils";
import { UserConstants } from "src/common/constants/user.constants";
import { BaseStatusEnums } from "../../../common/public/base-status.enums";
import {UserRole  } from "../user/entities/user.role.entity";

const excelHeader = [
  '角色名称', '字符权限', '角色顺序', 'status', '备注', ,
]
/**
 * 角色管理
 */
@Injectable()
export class RoleService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(Role) private role: Repository<Role>,
    @InjectRepository(RoleMenu) private roleMenu: Repository<RoleMenu>,
    @InjectRepository(UserRole) private userRole: Repository<UserRole>
  ) { }
  /**
   * 添加角色
   * @param role
   */
  async add(role: CreateRoleDto): Promise<void> {
    const { menuIds, ...roleInfo } = role
    await this.entityManager.transaction(async manager => {
      // 新增角色信息
      const result = await manager.insert(Role, roleInfo)
      const roleId = result.identifiers[0].roleId

      // 新增角色与菜单关联
      if (!isEmpty(menuIds)) {
        await manager.insert(
          RoleMenu,
          menuIds.map((menuId) => ({ roleId, menuId }))
        )
      }

    })
  }
  /**
     * 获取角色列表
     * @param query
     */
  async findAll(query: ListRoleDto): Promise<AjaxResult> {
    let endTime;
    // 判断是否传了创建时间区间
    if (query.startAndEndTime) {
      endTime = new Date(query.startAndEndTime[1])
    }
    // 置顶ID
    const toRoleId = 1;
    const paginationService = new PaginationService<Role>(
      this.role,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          roleName: Like(`%${query.roleName ? query.roleName : ''}%`),
          roleKey: Like(`%${query.roleKey ? query.roleKey : ''}%`),
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
  /**
   * 
   * @param id 角色ID
   * @returns 角色信息
   */
  async findOne(id: number): Promise<RoleInfoVo> {
    /**
     * 角色信息
     */
    const role = await this.role.findOne({
      where: {
        roleId: id
      }
    });
    /**
     * 角色菜单
     */
    const roleMenu = await this.roleMenu.find({
      where: {
        roleId: id
      }
    });
    return { ...role, menuIds: roleMenu.map(menu => menu.menuId) };
  }
  /**
   * 
   * @param id 角色ID
   * @returns 修改角色信息
   */
  async update(roleId: number, role: UpdateRoleDto): Promise<void> {
    const { menuIds, ...roleInfo } = role
    await this.entityManager.transaction(async manager => {
      // 修改角色信息
      await manager.update(Role, roleId, roleInfo)
      // 删除并新增角色与菜单关联
      await manager.delete(RoleMenu, { roleId })
      if (!isEmpty(menuIds)) {
        await manager.insert(
          RoleMenu,
          menuIds.map((menuId) => ({ roleId, menuId }))
        )
      }

    })
  }
  /**
     * 删除角色
     * @param ids 角色ID
     */
  async remove(ids: number[]): Promise<void> {
    await this.entityManager.transaction(async manager => {
      // 删除角色信息
      await manager.delete(Role, ids)
      // 删除角色与菜单关联
      await manager.delete(RoleMenu, { roleId: In(ids) })
    })
  }
  /**
  * 校验角色名称是否唯一
  * @param role 角色信息
  * @returns true 唯一 / false 不唯一
  */
  async checkRoleNameUnique(role: Partial<Role>): Promise<boolean> {
    const res = await this.role.findOne({
      where: {
        roleName: role.roleName
      }
    })
    if (res && res.roleId !== role.roleId) {
      return false
    }
    return true
  }
  /**
   * 校验角色编码是否唯一
   * @param role 角色信息
   * @returns true 唯一 / false 不唯一
   */
  async checkRoleCodeUnique(role: Partial<Role>): Promise<boolean> {
    const res = await this.role.findOne({
      where: {
        roleKey: role.roleKey
      }
    })
    if (res && res.roleId !== role.roleId) {
      return false
    }
    return true
  }

  /**导出excel */
  async downloadExcel(roleIds: number[]): Promise<AjaxResult> {
    /**
     * 1.查询数据
     * 2.导出excel
     */
    const list = await this.role.find({
      where: {
        roleId: In(roleIds)
      }
    })
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.roleId
      item.status = item.status === '1' ? '正常' : '停用'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()


    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量用户导出')

    return AjaxResult.success(excelFile)
  }
  /**
   * 查询角色列表
   * @returns 角色列表
   */
  async selectRole(query: ListRoleDto): Promise<AjaxResult> {
    let list = await this.role.find()
    list = list.filter(item => item.roleId !== UserConstants.SUPER_ROLE)
    return AjaxResult.success(list)
  }
  /**
   * 根据用户ID查询角色列表
   * @param userId 用户用户ID
   * @returns 用户角色列表
   */
  async selectRoleByUserId(userId: number): Promise<Role[]> {
    return this.role
      .createQueryBuilder('r')
      .leftJoin('sys_user_role', 'ur', 'r.roleId= ur.roleIds')
      .where('ur.userId = :userId', { userId })
      .andWhere('r.status = :status', { status: BaseStatusEnums.NORMAL })
      .getMany()
  }
  /**
   * 根据角色ID查询角色信息
   * @param roleId 角色ID
   * @returns 角色信息
   */
  async selectRoleByUserIdByProfile(roleId: number):Promise<Role>{
    return await this.role.findOne({where:{roleId:roleId}})
  }

}
