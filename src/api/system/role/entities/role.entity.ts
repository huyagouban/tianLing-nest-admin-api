import { Entity, Column, PrimaryGeneratedColumn,} from 'typeorm';
import { BaseTimeEntity } from "src/common/public/base-time-entity";
@Entity()
export class Role extends BaseTimeEntity {
    // 自增id
    @PrimaryGeneratedColumn()
    roleId: number
    // 角色名称
    @Column({
        type: "varchar",
        length: 255,
        name: "roleName",
        comment: "角色名称",
    })
    roleName: string
    // 权限字符
    @Column({
        type: "varchar",
        length: 255,
        name: "roleKey",
        comment: "权限字符",
    })
    roleKey: string
    // 角色顺序
    @Column(
        {
            type: "int",
            name: "roleSort",
            comment: "角色顺序",
        }
    )
    roleSort: number
    // 用户状态
    @Column({
        type: "enum",
        enum: ['0', '1',],//0：停用  1：正常
        name: "status",//列名
        default: '1',//默认值
        comment: "用户状态",
    })
    status: string 
       // 备注
       @Column({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
    })
    remark: string
}