import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from "./entities/menu.entity";
import { MenuTreeVo, RouterTreeVo } from "./vo/menu.vo";
import { TreeUtils } from "src/utils/tree/tree.utils";
import { AjaxResult } from "src/common/ajaxResult";
import { BaseStatusEnums } from "src/common/public/base-status.enums";
import { MenuConstants } from "src/common/constants/menu.constants";
import { IdentityUtils } from "src/utils/security/identity.utils";
@Injectable()
export class MenuService {
  // 创建菜单
  constructor(@InjectRepository(Menu) private readonly menu: Repository<Menu>) { } // 注入Menu实体类的Repository
  create(createMenuDto: CreateMenuDto) {
    const data = new Menu()
    // 父级id
    data.parentId = createMenuDto.parentId

    // 菜单类型
    data.menuType = createMenuDto.menuType

    // 菜单图标
    data.icon = createMenuDto.icon

    //菜单图标类型
    data.iconType=createMenuDto.iconType

    // 菜单名称
    data.menuName = createMenuDto.menuName

    // 显示排序
    data.sortNum = createMenuDto.sortNum

    // 是否外链
    data.isLink = createMenuDto.isLink

    // 路由地址
    data.path = createMenuDto.path

    // 组件路径
    data.component = createMenuDto.component

    // 权限字符
    data.perms = createMenuDto.perms

    // 是否缓存
    data.isCache = createMenuDto.isCache

    //  显示状态
    data.visible = createMenuDto.visible

    //  菜单状态
    data.status = createMenuDto.status

    return this.menu.save(data)

  }
  // 查询列表
  async findAll(query: { menuName?: string, status?: string }) {
    const data = await this.menu.find({
      //Like  模糊查询
      // 查询
      where: [{
        menuName: Like(`%${query.menuName ? query.menuName : ''}%`),
        status: Like(`%${query.status ? query.status : ''}%`)
      },],
      order: {
        sortNum: 'ASC'
      }
    })

    const menuTreeList=  TreeUtils.listToTree<MenuTreeVo>(data, {
      id: "id",
      pid: 'parentId'
    })
    return AjaxResult.success(menuTreeList)
  }
  // 查询详情
  async findOne(id: number) {
    const data = await this.menu.findOne({
      //Like  模糊查询
      // 查询
      where: {
        id: id,
      }
    })
    return AjaxResult.success(data)
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const data = await this.menu.update(id, updateMenuDto)
    return AjaxResult.success(data,'修改成功',true)
  }

  async remove(id: number) {
    const data = await this.menu.delete(id)

    return AjaxResult.success(data,'删除成功',true)
  }
  /**
   * 
   * @param id 父级id
   * @returns 检查是否有子菜单
   */
  async checkMenuChild(id: number): Promise<boolean> {
    const count = await this.menu.countBy({ parentId: id })
    return count > 0
  }

  /**
   * 
   * @param userId 用户id
   * @returns 获取用户菜单树
   */
  async selectUserMenuTree(userId:number):Promise<MenuTreeVo[]> { 
      
    let list: Menu[] = []
    /**
     * 1.超级管理员
     * 2.普通用户
     */
    if (IdentityUtils.isAdmin(userId)) {
      list = await this.menu
        .createQueryBuilder('m')
        .where('m.status = :status', { status: BaseStatusEnums.NORMAL })
        .andWhere('m.menuType IN (:...menuType)', { menuType: [MenuConstants.TYPE_DIR, MenuConstants.TYPE_MENU] })
        .orderBy('m.sortNum', 'ASC')
        .getMany()
    } else {
      list = await this.menu
        .createQueryBuilder('m')
        .leftJoin('sys_role_menu', 'rm', 'm.id = rm.menuId')
        .leftJoin('sys_user_role', 'ur', 'rm.roleId = ur.roleIds')
        .leftJoin('role', 'r', 'ur.roleIds = r.roleId')
        .where('ur.userId = :userId', { userId })
        .andWhere('m.status = :status', { status: BaseStatusEnums.NORMAL })
        .andWhere('r.status = :status', { status: BaseStatusEnums.NORMAL })
        .andWhere('m.menuType IN (:...menuType)', { menuType: [MenuConstants.TYPE_DIR, MenuConstants.TYPE_MENU] })
        .orderBy('m.sortNum', 'ASC')
        .distinct()
        .getMany()
    }
    return TreeUtils.listToTree<MenuTreeVo>(list, {
      id: "id",
      pid: 'parentId'
    })
   
  }

  /**
   * 
   * @param menus 菜单树结构数据
   * @returns 构建前端需要的路由树
   */
  buildMenuRouter(menus: MenuTreeVo[]): RouterTreeVo[] {
    const routers: RouterTreeVo[] = []
    for (const menu of menus) {
      const router = new RouterTreeVo()
      router.name = menu.path
      router.path =menu.isLink=='0'?('/'+menu.path):menu.path
      router.component =menu.parentId==0?"layout": menu.component
      router.status = menu.status
      router.visible = menu.visible,
      router.meta={
        icon:menu.icon,
        isLink :menu.isLink,
        isCache : menu.isCache,
        iconType:menu.iconType,
        title:menu.menuName
      }
      router.children = menu.children && this.buildMenuRouter(menu.children)
      routers.push(router)
    }
    return routers
  }
   /**
   * 根据用户ID查询菜单列表
   * @param userId 用户ID
   * @returns 用户菜单列表
   */
   async selectMenuByUserId(userId: number): Promise<Menu[]> {
    return this.menu
      .createQueryBuilder('m')
      .leftJoin('sys_role_menu', 'rm', 'm.id = rm.menuId')
      .leftJoin('sys_user_role', 'ur', 'rm.roleId = ur.roleIds')
      .leftJoin('role', 'r', 'ur.roleids = r.roleId')
      .where('ur.userId = :userId', { userId })
      .andWhere('m.status = :status', { status: BaseStatusEnums.NORMAL })
      .andWhere('r.status = :status', { status: BaseStatusEnums.NORMAL })
      .distinct()
      .getMany()
  }
}


