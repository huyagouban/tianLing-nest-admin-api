import { LoginLogService } from './login-log.service';
import { ListLoginLogDto, DownloadExcel } from "src/api/monitor/login-log/dto/login-log.dto";
import { AjaxResult } from "src/common/ajaxResult";
export declare class LoginLogController {
    private readonly loginLogService;
    constructor(loginLogService: LoginLogService);
    loginLogList(query: ListLoginLogDto): Promise<AjaxResult>;
    loginLogDelete(id: number[]): Promise<AjaxResult>;
    loginLogClear(): Promise<AjaxResult>;
    downloadExcel(response: Response, query: DownloadExcel): Promise<AjaxResult>;
}
