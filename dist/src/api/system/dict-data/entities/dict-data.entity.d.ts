import { BaseTimeEntity } from "src/common/public/base-time-entity";
export declare class DictData extends BaseTimeEntity {
    dictDataId: number;
    dictType: string;
    dictDataLabel: string;
    dictDataValue: string;
    sortNum: number;
    status: string;
    cssClass: string;
    remark: string;
}
