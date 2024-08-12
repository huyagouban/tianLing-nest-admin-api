import { BaseTimeEntity } from "src/common/public/base-time-entity";
export declare class LoginLog extends BaseTimeEntity {
    loginId: number;
    loginName: string;
    loginStatus: string;
    loginIp?: string;
    loginLocation?: string;
    loginMessage?: string;
    userAgent?: string;
    browser?: string;
    os?: string;
}
