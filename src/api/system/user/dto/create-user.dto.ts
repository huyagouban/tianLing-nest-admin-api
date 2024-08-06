
import { OmitType } from '@nestjs/mapped-types'
import { Allow, IsArray, IsOptional } from 'class-validator'
import { User } from '../entities/user.entity'
import { PagesDto } from "src/common/public/base-pages-entity";

/**
 * 添加用户
 */
export class CreateUserDto extends OmitType(User, ['userId'] as const) {
    /** 用户角色 */
    @IsArray()
    @IsOptional()
    roleIds?: number
}
