import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseTimeEntity } from "src/common/public/base-time-entity";

@Entity({ name: 'sys_dict_data' })
export class DictData extends BaseTimeEntity {
    /**
     * 字典数据id
     */
    @PrimaryGeneratedColumn()
    dictDataId: number

    /**
     * 字典类型
     */
    @Column(
        {
            type: "varchar",
            length: 255,
            name: "dictType",
            comment: "字典类型",
        }
    )
    dictType: string

    /**
     * 字典标签
     */
    @Column({
        type: "varchar",
        length: 255,
        name: "dictDataLabel",
        comment: "字典标签",
    })
    dictDataLabel: string

    /**
     * 字典键值
     */
    @Column(
        {
            type: "varchar",
            length: 255,
            name: "dictDataValue",
            comment: "字典键值",
        }
    )
    dictDataValue: string

    /**
     * 字典顺序
     */
    @Column({
        type: "int",
        name: "sortNum",
        comment: "字典顺序",
    })
    sortNum: number

    /**
     * 字典状态
     */
    @Column({
        type: "enum",
        enum: ['0', '1',],//0：停用  1：正常
        name: "status",//列名
        default: '1',//默认值
        comment: "字典状态",
    })
    status: string

    /**
    * 回显样式
    */
    @Column(
        {
            type: "varchar",
            length: 255,
            name: "cssClass",
            comment: "回显样式",
        }
    )
    cssClass: string
    /**
     * 字典备注
     */
    @Column({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
        default: '',
    })
    remark: string
}
