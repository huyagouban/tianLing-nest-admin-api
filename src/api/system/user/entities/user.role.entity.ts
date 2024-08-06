import { BaseTimeEntity } from "src/common/public/base-time-entity";
import { Column, Entity } from 'typeorm'

/**
 * 角色和菜单关联表 角色1-N菜单
 */
@Entity({ name: 'sys_user_role' })
export class UserRole extends BaseTimeEntity {  
    @Column({
        type: 'int',
        comment: '用户ID',
        primary: true
    })
    userId: number
    @Column({
        type: 'int',
        comment: '角色ID',
        primary: true
    })
    roleIds: number
}