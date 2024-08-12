import { OperType } from 'src/common/class/oper-log-enums';
export declare class LogOptions {
    title: string;
    operType?: OperType;
    isSaveRequestData?: boolean;
    isSaveResponseData?: boolean;
}
export declare const Log: (options: LogOptions) => import("@nestjs/common").CustomDecorator<string>;
