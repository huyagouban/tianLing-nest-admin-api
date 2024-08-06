import { BaseTimeEntity } from "src/common/public/base-time-entity";
import { BaseStatusEnums } from 'src/common/public/base-status.enums'
import { OperType } from 'src/common/class/oper-log-enums'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 操作日志表
 */
@Entity({ name: 'monitor_oper_log' })
export class OperLog extends BaseTimeEntity {
    @PrimaryGeneratedColumn({
        name: 'operId',
        type: 'int',
        comment: '日志编号',
    })
    @IsInt()
    @IsNotEmpty()
    operId: number

    @Column({
        name: 'title',
        type: 'varchar',
        length: 50,
        comment: '模块标题',
    })
    @MaxLength(50)
    @IsNotEmpty()
    title: string

    @Column({
        name: 'operType',
        type: 'char',
        length: 2,
        comment: '操作类型',
    })
    @IsEnum(OperType)
    @IsNotEmpty()
    operType: string

    @Column({
        name: 'operName',
        type: 'varchar',
        length: 50,
        comment: '操作人员',
    })
    @MaxLength(50)
    @IsNotEmpty()
    operName: string

    @Column({
        name: 'operMethod',
        type: 'varchar',
        length: 100,
        comment: '操作方法',
    })
    @MaxLength(100)
    @IsNotEmpty()
    operMethod: string

    @Column({
        name: 'operIp',
        type: 'varchar',
        length: 128,
        nullable: true,
        comment: '操作地址',
    })
    @MaxLength(128)
    @IsOptional()
    operIp?: string

    @Column({
        name: 'operLocation',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作地点',
    })
    @MaxLength(255)
    @IsOptional()
    operLocation?: string

    @Column({
        name: 'operStatus',
        type: 'char',
        length: 1,
        comment: '操作状态',
    })
    @IsEnum(BaseStatusEnums)
    @IsNotEmpty()
    operStatus: string

    @Column({
        name: 'requestUrl',
        type: 'varchar',
        length: 1000,
        comment: '请求URL',
    })
    @MaxLength(1000)
    @IsNotEmpty()
    requestUrl: string

    @Column({
        name: 'requestMethod',
        type: 'varchar',
        length: 10,
        comment: '请求方式',
    })
    @MaxLength(10)
    @IsNotEmpty()
    requestMethod: string

    @Column({
        name: 'requestParam',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求参数',
    })
    @MaxLength(2000)
    @IsOptional()
    requestParam?: string

    @Column({
        name: 'requestResult',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求返回结果',
    })
    @MaxLength(2000)
    @IsOptional()
    requestResult?: string

    @Column({
        name: 'requestErrmsg',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求错误消息',
    })
    @MaxLength(2000)
    @IsOptional()
    requestErrmsg?: string


    @Column({
        name: 'costTime',
        type: 'varchar',
        length: 10,
        nullable: true,
        comment: '请求耗时',
    })
    @IsOptional()
    costTime?: string
}

