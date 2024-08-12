import { User } from '../../api/system/user/entities/user.entity';
export declare class LoginUser {
    userSk: string;
    userId: number;
    userName: string;
    loginTime: number;
    expireTime: number;
    loginIp: string;
    permissions: string[];
    roles: string[];
    user: User;
    tokenId: number;
    loginName: string;
    loginLocation: string;
    browser: string;
    os: string;
    iat: number;
}
