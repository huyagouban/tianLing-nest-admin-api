import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseArrayPipe, Res } from '@nestjs/common';
import { DictDataService } from './dict-data.service';
import { CreateDictDataDto, UpdateDictDataDto, ListDictDataDto, DownloadExcel } from './dto/dict-data.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
@Controller('dict-data')
export class DictDataController {
  constructor(private readonly dictDataService: DictDataService) { }

  /**
   * 添加字典数据
   * @param datcData 
   * @returns 
   */
  @Post('add')
  @RequirePermissions('sys_dict_add')
  @Log({ title: '新增字典数据', operType: OperType.ADD })
  async dictDataAdd(@Body() datcData: CreateDictDataDto): Promise<AjaxResult> {
    return await this.dictDataService.dictDataAdd(datcData);
  }
  /**
   * 获取字典数据列表
   * @param query 
   * @returns 
   */
  @Get('list')
  async dictDataList(@Query() query: ListDictDataDto): Promise<AjaxResult> {
    return await this.dictDataService.dictDataList(query);
  }

  /**
   * 获取字典数据详情
   * @param id 
   * @returns 
   */
  @Get('list/:id')
  async dictDataInfo(@Param('id') id: number): Promise<AjaxResult> {
    return await this.dictDataService.dictDataInfo(id);
  }
  /**
   * 更新字典数据
   * @param id 
   * @param dictData 
   * @returns 
   */
  @Put('update/:id')
  @RequirePermissions('sys_dict_edit')
  @Log({ title: '修改字典数据', operType: OperType.UPDATE })
  async updateDictData(@Param('id') id: number, @Body() dictData: UpdateDictDataDto) {
    return await this.dictDataService.updateDictData(id, dictData);
  }
  /**
   * 删除字典数据
   * @param id 
   * @returns 
   */
  @Delete('delete/:id')
  @RequirePermissions('sys_dict_delete')
  @Log({ title: '删除字典数据', operType: OperType.DELETE })
  async deleteDictData(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]): Promise<AjaxResult> {
    return await this.dictDataService.deleteDictData(id);
  }

  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('sys_dict_export')
  @Log({ title: '导出字典数据', operType: OperType.EXPORT })
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: DownloadExcel,): Promise<AjaxResult> {
    try {
      let ids = query.dictDataIds.split(',').map(Number);
      return await this.dictDataService.downloadExcel(ids)
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      AjaxResult.error(error);

    }
  }
  /**
   * 获取字典数据下拉列表
   * @param dictType 
   * @returns 
   */
  @Get('option/:dictType')
  async dictDataOption(@Param('dictType') dictType: string): Promise<AjaxResult> {
    return await this.dictDataService.dictDataOption(dictType);
  }
}
