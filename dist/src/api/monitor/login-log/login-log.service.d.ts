import { CreateLoginLogDto, ListLoginLogDto } from './dto/login-log.dto';
import { LoginLog } from "src/api/monitor/login-log/entities/login-log.entity";
import { Repository } from 'typeorm';
import { RequestContext } from "src/utils/context/request.context";
import { AjaxResult } from "src/common/ajaxResult";
export declare class LoginLogService {
    private readonly loginLog;
    private readonly requestContext;
    constructor(loginLog: Repository<LoginLog>, requestContext: RequestContext);
    add(loginLog: CreateLoginLogDto): Promise<void>;
    loginLogList(query: ListLoginLogDto): Promise<AjaxResult>;
    loginLogDelete(id: number[]): Promise<AjaxResult>;
    downloadExcel(loginIds?: number[]): Promise<AjaxResult>;
    loginLogClear(): Promise<AjaxResult>;
    ok(name: string, message: string): void;
    fail(name: string, message: string): void;
    private saveLoginLog;
}
