import { BaseTimeEntity } from "src/common/public/base-time-entity";
import { Column, Entity } from 'typeorm'

/**
 * 角色和菜单关联表 角色1-N菜单
 */
@Entity({ name: 'sys_role_menu' })
export class RoleMenu extends BaseTimeEntity {
    @Column({
        type: 'int',
        comment: '角色ID',
        primary: true
    })
    roleId: number

    @Column({
        type: 'int',
        comment: '菜单ID',
        primary: true
    })
    menuId: number
}
