import { PagesDto } from "src/common/public/base-pages-entity";
import { OperLog } from 'src/api/monitor/oper-log/entities/oper-log.entity';
export declare class ListOperLogDto extends PagesDto {
    operIp?: string;
    title?: string;
    operType?: string;
    operName?: string;
    operStatus?: string;
    requestUrl?: string;
    startAndEndTime?: string[];
}
declare const CreateOperLogDto_base: import("@nestjs/mapped-types").MappedType<Omit<OperLog, "operId">>;
export declare class CreateOperLogDto extends CreateOperLogDto_base {
}
export declare class OperLogDownloadExcel {
    operIds: string;
}
export {};
