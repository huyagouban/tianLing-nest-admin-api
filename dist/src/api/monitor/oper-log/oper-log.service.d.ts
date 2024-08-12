import { CreateOperLogDto, ListOperLogDto } from './dto/oper-log.dto';
import { Repository } from 'typeorm';
import { OperLog } from "src/api/monitor/oper-log/entities/oper-log.entity";
import { AjaxResult } from "src/common/ajaxResult";
export declare class OperLogService {
    private readonly operLog;
    constructor(operLog: Repository<OperLog>);
    operLogList(query: ListOperLogDto): Promise<AjaxResult>;
    operLogDelete(id: number[]): Promise<AjaxResult>;
    operLogClear(): Promise<AjaxResult>;
    addOperLog(query: CreateOperLogDto): Promise<void>;
    downloadExcel(operIds?: number[]): Promise<AjaxResult>;
    operLogInfo(id: number): Promise<AjaxResult>;
}
