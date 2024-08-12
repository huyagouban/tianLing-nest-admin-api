import { ProfileService } from './profile.service';
import { AjaxResult } from "src/common/ajaxResult";
import { UpdateProfileDto, UpdatePasswordDto } from "src/api/system/profile/entities/profile.entity";
import { JwtService } from '@nestjs/jwt';
export declare class ProfileController {
    private readonly profileService;
    private readonly jwtService;
    constructor(profileService: ProfileService, jwtService: JwtService);
    profile(req: Request): Promise<AjaxResult>;
    updateUserInfo(user: UpdateProfileDto): Promise<AjaxResult>;
    updatePassword(user: UpdatePasswordDto): Promise<AjaxResult>;
}
