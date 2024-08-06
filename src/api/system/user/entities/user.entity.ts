import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
/**
 * 用户表
 */
@Entity()
export class User {
    // 自增id
    @PrimaryGeneratedColumn()
    userId: number;

    //   用户昵称
    @Column({
        type: "varchar",
        length: 255,
        name: "nickName",
        comment: "用户昵称",
    })
    nickName: string;
    // 手机号码
    @Column({
        type: "varchar",
        length: 11,
        name: "phoneNumber",
        comment: "手机号码",
        default: '',
    })
    phoneNumber?: string;

    // 邮箱地址
    @Column({
        type: "varchar",
        length: 255,
        name: "email",
        comment: "邮箱地址",
        default: '',
    })
    email?: string;

    // 用户性别   0：女 1：男
    @Column({
        type: "enum",
        enum: ['0', '1', ''],
        name: "sex",//列名
        comment: "用户性别",
        default: '',
    })
    sex?: string;


    //   用户名称
    @Column({
        type: "varchar",
        length: 20,
        name: "userName",
        comment: "用户名称",
    })
    userName: string;

    //   用户密码
    @Column({
        type: "varchar",
        length: 255,
        name: "password",
        comment: "用户密码",
        select: false,
    })
    password: string;


    // 用户状态   0：停用 1：正常
    @Column({
        type: "enum",
        enum: ['0', '1',],
        name: "status",//列名
        comment: "用户状态",
        default: '1',
    })
    status?: string;


    @Column({
        name: 'avatar',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '头像地址',
    })
    avatar?: string
    //   备注
    @Column({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
        default: ''
    })
    remark: string;

    // 创建时间
    @CreateDateColumn({ type: "timestamp" })
    createDate: Date

    //更新时间
    @UpdateDateColumn({ type: 'timestamp' })
    updateDate: Date

}
