import { OmitType } from '@nestjs/mapped-types'
import { Allow, IsArray, IsOptional } from 'class-validator'
import { Role } from '../entities/role.entity'
import { PagesDto } from "src/common/public/base-pages-entity";
/**
 * 添加角色
 */
export class CreateRoleDto extends OmitType(Role, ['roleId'] as const) {
    /** 菜单权限 */
    @IsArray()
    @IsOptional()
    menuIds?: number[]

    /** 部门权限 */
    @IsArray()
    @IsOptional()
    deptIds?: number[]
}

/**
 * 查询角色
 */
export class ListRoleDto extends PagesDto {
    /** 角色名称 */
    @Allow()
    roleName?: string

    /** 角色编码 */
    @Allow()
    roleKey?: string

    /** 角色状态（0正常 1停用） */
    @Allow()
    status?: string
    

    /**以逗号分隔的字符串角色ID */
    @Allow()
    roleIds?: string
    
    //创建时间段，以逗号分隔的字符串
    startAndEndTime: string[]

}


/**
 * 更新角色
 */
export class UpdateRoleDto extends OmitType(Role, [] as const) {
    /** 菜单权限 */
    @IsArray()
    @IsOptional()
    menuIds?: number[]

    /** 部门权限 */
    @IsArray()
    @IsOptional()
    deptIds?: number[]
}