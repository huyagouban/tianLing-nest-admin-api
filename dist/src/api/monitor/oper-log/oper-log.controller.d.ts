import { OperLogService } from './oper-log.service';
import { ListOperLogDto, OperLogDownloadExcel } from './dto/oper-log.dto';
import { AjaxResult } from "src/common/ajaxResult";
export declare class OperLogController {
    private readonly operLogService;
    constructor(operLogService: OperLogService);
    operLogList(query: ListOperLogDto): Promise<AjaxResult>;
    operLogDelete(id: number[]): Promise<AjaxResult>;
    operLogClear(): Promise<AjaxResult>;
    downloadExcel(response: Response, query: OperLogDownloadExcel): Promise<AjaxResult>;
    operLogInfo(id: number): Promise<AjaxResult>;
}
