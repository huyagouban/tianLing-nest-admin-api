import { User } from 'src/api/system/user/entities/user.entity';
import { Role } from "src/api/system/role/entities/role.entity";
export declare class ProfileInfoVo extends User {
    roles?: Role[] | Role;
}
