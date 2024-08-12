import { BaseTimeEntity } from "src/common/public/base-time-entity";
export declare class Dict extends BaseTimeEntity {
    dictId: number;
    dictName: string;
    dictType: string;
    status: string;
    remark: string;
}
