import { Controller, Delete, Get, Query, Param, ParseArrayPipe, Res } from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { ListOperLogDto, OperLogDownloadExcel } from './dto/oper-log.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
/**
 * 操作日志
 */
@Controller('oper-log')
export class OperLogController {
  constructor(private readonly operLogService: OperLogService) { }

  /**
 * 操作日志列表
 * @param query 操作日志信息
 * @returns 操作日志列表
 */
  @Get('list')
  @RequirePermissions('monitor_operLog_list')
  async operLogList(@Query() query: ListOperLogDto): Promise<AjaxResult> {
    return await this.operLogService.operLogList(query);
  }

  /**
   * 删除操作日志
   * @param id 操作日志id
   * @returns 删除结果
   */
  @Delete('delete/:id')
  @RequirePermissions('monitor_operLog_delete')
  @Log({ title: '删除操作日志', operType: OperType.DELETE })
  async operLogDelete(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]): Promise<AjaxResult> {
    return await this.operLogService.operLogDelete(id);
  }

  /**
 * 清空操作日志
 * @returns 
 */
  @Delete('clear')
  @RequirePermissions('monitor_operLog_clear')
  @Log({ title: '清空操作日志', operType: OperType.CLEAN })
  async operLogClear(): Promise<AjaxResult> {
    return await this.operLogService.operLogClear();
  }

  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('monitor_operLog_export')
  @Log({ title: '导出操作日志', operType: OperType.EXPORT })
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: OperLogDownloadExcel,): Promise<AjaxResult> {
    try {
      let ids = query.operIds ? query.operIds.split(',').map(Number) : undefined;
      return await this.operLogService.downloadExcel(ids)
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      AjaxResult.error(error);

    }
  }

  @Get('info/:id')
  async operLogInfo(@Param('id') id: number): Promise<AjaxResult> {
    return await this.operLogService.operLogInfo(id);
  }
}
