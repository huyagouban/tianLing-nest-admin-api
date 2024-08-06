
import { User } from 'src/api/system/user/entities/user.entity'
import { Role } from "src/api/system/role/entities/role.entity";

/**
 * 个人信息
 */
export class ProfileInfoVo extends User {
    /** 角色信息 */
    roles?: Role[]|Role
}