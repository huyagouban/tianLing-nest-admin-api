export class CreateMenuDto {

    // 父级id
    parentId: number

    // 菜单类型
    menuType: string

    // 菜单图标
    icon: string

    //菜单图标类型
    iconType:string
    
    // 菜单名称
    menuName: string

    // 显示排序
    sortNum: number

    // 是否外链
    isLink: string

    // 路由地址
    path: string

    // 组件路径
    component: string

    // 权限字符
    perms: string

    // 是否缓存
    isCache: string

    //  显示状态
    visible: string

    //  菜单状态
    status: string


}
