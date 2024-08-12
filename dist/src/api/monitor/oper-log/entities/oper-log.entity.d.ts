import { BaseTimeEntity } from "src/common/public/base-time-entity";
export declare class OperLog extends BaseTimeEntity {
    operId: number;
    title: string;
    operType: string;
    operName: string;
    operMethod: string;
    operIp?: string;
    operLocation?: string;
    operStatus: string;
    requestUrl: string;
    requestMethod: string;
    requestParam?: string;
    requestResult?: string;
    requestErrmsg?: string;
    costTime?: string;
}
