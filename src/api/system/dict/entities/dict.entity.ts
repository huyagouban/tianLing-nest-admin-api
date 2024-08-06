import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseTimeEntity } from "src/common/public/base-time-entity";
@Entity({ name: 'dict' })
export class Dict extends BaseTimeEntity {
    /** 字典Id*/
    @PrimaryGeneratedColumn({
        comment: '字典Id',
    })
    dictId: number

    /** 字典名称*/
    @Column({
        type: "varchar",
        length: 255,
        name: "dictName",
        comment: "字典名称",
    })
    dictName: string

    /** 字典类型*/
    @Column({
        type: "varchar",
        length: 255,
        name: "dictType",
        comment: "字典类型",
    })
    dictType: string


    /** 字典状态*/
    @Column({
        type: "enum",
        enum: ['0', '1',],//0：停用  1：正常
        name: "status",//列名
        default: '1',//默认值
        comment: "字典状态",
    })    
    status: string


    /** 字典备注*/   
    @Column({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
        default: '',
    })
    remark: string
}
