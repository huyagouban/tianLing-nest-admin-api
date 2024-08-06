import { Role } from "../entities/role.entity";

/**
 * 角色详情
 */
export class RoleInfoVo extends Role {
    /** 菜单权限 */
    menuIds: number[]
}
