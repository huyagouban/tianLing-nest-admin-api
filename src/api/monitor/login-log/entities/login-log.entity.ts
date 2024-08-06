
import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseTimeEntity } from "src/common/public/base-time-entity";
import { BaseStatusEnums } from 'src/common/public/base-status.enums'
/**
 * 登录日志表
 */
@Entity({ name: 'sys_login_log' })
export class LoginLog extends BaseTimeEntity {
    @PrimaryGeneratedColumn({
        name: 'loginId',
        type: 'int',
        comment: '登录ID',
    })
    @IsInt()
    @IsNotEmpty()
    loginId: number

    @Column({
        name: 'loginName',
        type: 'varchar',
        length: 50,
        comment: '用户账号',
    })
    @MaxLength(50)
    @IsNotEmpty()
    loginName: string

    @Column({
        name: 'loginStatus',
        type: 'char',
        length: 1,
        comment: '登录状态',
    })
    @IsEnum(BaseStatusEnums)
    @IsNotEmpty()
    loginStatus: string

    @Column({
        name: 'loginIp',
        type: 'varchar',
        length: 128,
        nullable: true,
        comment: 'IP地址',
    })
    @MaxLength(128)
    @IsOptional()
    loginIp?: string

    @Column({
        name: 'loginLocation',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '登录地点',
    })
    @MaxLength(255)
    @IsOptional()
    loginLocation?: string

    @Column({
        name: 'loginMessage',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作信息',
    })
    @MaxLength(255)
    @IsOptional()
    loginMessage?: string

    @Column({
        name: 'userAgent',
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: '用户代理',
    })
    @MaxLength(500)
    @IsOptional()
    userAgent?: string

    @Column({
        name: 'browser',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '浏览器',
    })
    @MaxLength(255)
    @IsOptional()
    browser?: string

    @Column({
        name: 'os',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作系统',
    })
    @MaxLength(255)
    @IsOptional()
    os?: string
}
