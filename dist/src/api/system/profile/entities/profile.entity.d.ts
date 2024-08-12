import { User } from 'src/api/system/user/entities/user.entity';
import { ProfileInfoVo } from "src/api/system/profile/vo/profile.vo";
export declare class UpdateProfileDto extends ProfileInfoVo {
    nickName: string;
    email: string;
    phonenumber: string;
    sex: string;
}
export declare class UpdatePasswordDto extends User {
    oldPassword: string;
    newPassword: string;
}
