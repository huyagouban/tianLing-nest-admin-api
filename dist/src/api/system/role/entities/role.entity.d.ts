import { BaseTimeEntity } from "src/common/public/base-time-entity";
export declare class Role extends BaseTimeEntity {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    status: string;
    remark: string;
}
