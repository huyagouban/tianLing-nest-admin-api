import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class Menu {
    // 自增id
    @PrimaryGeneratedColumn()
    id: number
    // 父级id
    @Column(
        {
            type: "int",
            name: "parentId",
            comment: "父级id",
        }
    )
    parentId: number
    // 菜单类型  M：目录  C：菜单   F：按钮
    @Column({
        type: "enum",
        enum: ['M', 'C', 'F'],
        name: "menuType",//列名
        default: 'M',//默认值
        comment: "菜单类型",
    })
    menuType: string
    // 菜单图标
    @Column({
        type: "varchar",
        length: 255,
        name: "icon",
        comment: "菜单图标",
    })
    icon: string
    // 菜单图标
    @Column({
        type: "varchar",
        length: 255,
        name: "iconType",
        comment: "菜单图标类型",
    })
    iconType: string
    // 菜单名称
    @Column({
        type: "varchar",
        length: 255,
        name: "menuName",
        comment: "菜单名称",
    })
    menuName: string
    // 显示排序
    @Column(
        {
            type: "int",
            name: "sortNum",
            comment: "显示排序",
        }
    )
    sortNum: number
    // 是否外链
    @Column({
        type: "enum",
        enum: ['0', '1', ],
        name: "isLink",//列名
        default: '0',//默认值
        comment: "是否外链",
    })
    isLink: string
    // 路由地址
    @Column({
        type: "varchar",
        length: 255,
        name: "path",
        comment: "路由地址",
    })
    path: string
    // 组件路径
    @Column({
        type: "varchar",
        length: 255,
        name: "component",
        comment: "组件路径",
    })
    component: string
    // 权限字符
    @Column({
        type: "varchar",
        length: 255,
        name: "perms",
        comment: "权限字符",
    })
    perms: string
    // 是否缓存
    @Column({
        type: "enum",
        enum: ['0', '1', ],
        name: "isCache",//列名
        default: '0',//默认值
        comment: "是否缓存",
    })
    isCache: string
    //  显示状态
    @Column({
        type: "enum",
        enum: ['0', '1', ],
        name: "visible",//列名
        default: '0',//默认值
        comment: "显示状态",
    })
    visible: string
    //  菜单状态
    @Column({
        type: "enum",
        enum: ['0', '1', ],
        name: "status",//列名
        default: '0',//默认值
        comment: "菜单状态",
    })
    status: string
    
    // 创建时间
    @CreateDateColumn({type:"timestamp"})
    createDate:Date
}