import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseArrayPipe, Res } from '@nestjs/common';
import { DictService } from './dict.service';
import { ListDictDataDto, CreateDictDto, DownloadExcel } from './dto/dict.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) { }

  /**
   * 添加字典
   * @param dict 
   */
  @Post('add')
  @RequirePermissions('sys_dict_add')
  @Log({ title: '新增字典', operType: OperType.ADD })
  async dictAdd(@Body() dict: CreateDictDto): Promise<AjaxResult> {
    return await this.dictService.add(dict);
  }
  /**
   * 获取字典列表
   */
  @Get('list')
  async dictList(@Query() query: ListDictDataDto): Promise<AjaxResult> {
    return await this.dictService.dictList(query);
  }
  /**
   * 获取字典详情
   */
  @Get('dictInfo/:id')
  @RequirePermissions('sys_dict_query')
  async dictInfo(@Param('id') id: number): Promise<AjaxResult> {

    return await this.dictService.dictInfo(id);
  }
  /**
   * 修改字典
   */
  @Put('update/:id')
  @RequirePermissions('sys_dict_edit')
  @Log({ title: '修改字典', operType: OperType.UPDATE })
  async update(@Param('id') id: string, @Body() updateDictDto): Promise<AjaxResult> {
    return await this.dictService.update(+id, updateDictDto);
  }
  /**
   * 删除字典
   */
  @Delete('delete/:id')
  @RequirePermissions('sys_dict_delete')
  @Log({ title: '删除字典', operType: OperType.DELETE })
  async delete(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]): Promise<AjaxResult> {
    return await this.dictService.delete(id);
  }

  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('sys_dict_export')
  @Log({ title: '导出字典', operType: OperType.EXPORT })
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: DownloadExcel,): Promise<AjaxResult> {
    try {
      let ids = query.dictIds.split(',').map(Number);
      return await this.dictService.downloadExcel(ids);
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      AjaxResult.error(error);

    }
  }

   /**
   * 获取字典列表无分页
   */
   @Get('selectList')
   async dictSelectList(@Query() query: ListDictDataDto): Promise<AjaxResult> {
     return await this.dictService.dictSelectList(query);
   }
}
