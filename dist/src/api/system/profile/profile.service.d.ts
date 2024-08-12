import { UserService } from "src/api/system/user/user.service";
import { User } from "src/api/system/user/entities/user.entity";
import { RoleService } from "src/api/system/role/role.service";
import { ProfileInfoVo } from "./vo/profile.vo";
import { UpdateProfileDto, UpdatePasswordDto } from "src/api/system/profile/entities/profile.entity";
import { Role } from "src/api/system/role/entities/role.entity";
import { AjaxResult } from "src/common/ajaxResult";
import { Repository } from 'typeorm';
export declare class ProfileService {
    private readonly userRepository;
    private userService;
    private roleService;
    constructor(userRepository: Repository<User>, userService: UserService, roleService: RoleService);
    profile(userId: number): Promise<ProfileInfoVo>;
    updateUserInfo(user: UpdateProfileDto): Promise<AjaxResult>;
    getProfileRoles(userId: number): Promise<Role[] | Role>;
    updatePassword(userInfo: UpdatePasswordDto): Promise<AjaxResult>;
}
