import { Controller, Get, Param, Delete, Query, } from '@nestjs/common';
import { OnlineService } from './online.service';
import { ListOnlineDto } from './dto/online.dto';
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { AjaxResult } from "src/common/ajaxResult";

/**
 * 在线用户
 */
@Controller('online')
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) { }
  /**
   * 在线用户列表
   */
  @Get('list')
  @RequirePermissions('monitor_online_list')
  async onlineList(@Query() query: ListOnlineDto,): Promise<AjaxResult> {
    return await this.onlineService.onlineList(query);
  }
  /**
   * 强退用户
   */
  @Delete(':userId')
  @RequirePermissions('monitor_online_logout')  
  async logout(@Param('userId') userId: number): Promise<AjaxResult> {
    return await this.onlineService.logout(userId);
  }
}
