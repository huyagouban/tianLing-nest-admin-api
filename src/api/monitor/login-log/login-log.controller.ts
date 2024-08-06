import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseArrayPipe, Res } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { ListLoginLogDto, DownloadExcel } from "src/api/monitor/login-log/dto/login-log.dto";
import { AjaxResult } from "src/common/ajaxResult";
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
/**
 * 登录日志
 */
@Controller('login-log')
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) { }

  /**
   * 获取登录日志列表
   * @param query 
   * @returns 
   */
  @Get('list')
  @RequirePermissions('monitor_loginLog_list')
  async loginLogList(@Query() query: ListLoginLogDto): Promise<AjaxResult> {
    return await this.loginLogService.loginLogList(query);
  }

  /**
   * 删除登录日志
   * @param id 
   * @returns 
   */
  @Delete('delete/:id')
  @RequirePermissions('monitor_loginLog_delete')
  async loginLogDelete(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]): Promise<AjaxResult> {
    return await this.loginLogService.loginLogDelete(id);
  }

  /**
   * 清空登录日志
   * @returns 
   */
  @Delete('clear')
  @RequirePermissions('monitor_loginLog_clear')
  async loginLogClear(): Promise<AjaxResult> {
    return await this.loginLogService.loginLogClear();
  }
  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('monitor_loginLog_export')
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: DownloadExcel,): Promise<AjaxResult> {
    try {
      let ids = query.loginLogIds ? query.loginLogIds.split(',').map(Number) : undefined;
      return await this.loginLogService.downloadExcel(ids)
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      AjaxResult.error(error);

    }
  }
}
