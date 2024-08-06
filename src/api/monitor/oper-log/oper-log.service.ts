import { Injectable } from '@nestjs/common';
import { CreateOperLogDto, ListOperLogDto } from './dto/oper-log.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { OperLog } from "src/api/monitor/oper-log/entities/oper-log.entity";
import { PaginationService } from "src/utils/PaginationResult/paginationResult.utils";
import { AjaxResult } from "src/common/ajaxResult";
import { DownloadExcelService } from "src/utils/ExcelService/ExcelService.utils";
@Injectable()
export class OperLogService {
  constructor(
    @InjectRepository(OperLog)
    private readonly operLog: Repository<OperLog>,
  ) { }
  /**
   * 操作日志列表
   * @param query 
   * @returns 
   */
  async operLogList(query: ListOperLogDto): Promise<AjaxResult> {
    let endTime;
    // 判断是否传了创建时间区间
    if (query.startAndEndTime) {
      endTime = new Date(query.startAndEndTime[1])
    }
    const paginationService = new PaginationService<OperLog>(
      this.operLog,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          operIp: Like(`%${query.operIp ? query.operIp : ''}%`),
          title: Like(`%${query.title ? query.title : ''}%`),
          operName: Like(`%${query.operName ? query.operName : ''}%`),
          operType: Like(`%${query.operType ? query.operType : ''}%`),
          operStatus: Like(`%${query.operStatus ? query.operStatus : ''}%`),
          createDate: query.startAndEndTime ? Between(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
        },],
        order: {
          updateDate: "DESC",
        }
      },
    });

    return AjaxResult.success(res);
  }

  /**
   * 删除操作日志
   * @param id 
   * @returns 
   */
  async operLogDelete(id: number[]): Promise<AjaxResult> {
    return AjaxResult.success(await this.operLog.delete(id), '删除成功');
  }

  /**
   * 清空操作日志
   * @returns 
   */
  async operLogClear(): Promise<AjaxResult> {
    return AjaxResult.success(await this.operLog.clear(), '清空成功');
  }

  /**
    * 添加操作日志
    * @param query 
    * @returns 
    */
  async addOperLog(query: CreateOperLogDto): Promise<void> {
    await this.operLog.save(query);
  }
  /**导出excel */
  async downloadExcel(operIds?: number[]): Promise<AjaxResult> {

    /**
     * 1.查询数据
     * 2.导出excel
     */
    let list: OperLog[];
    if (operIds) {
      list = await this.operLog.find({
        where: {
          operId: In(operIds)
        }
      })
    } else {
      list = await this.operLog.find({
        order: {
          createDate: "DESC",
        }
      })
    }
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.operId
      item.operStatus = item.operStatus === '1' ? '成功' : '失败'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()
    const excelHeader = [
      '模块标题', '操作类型', '操作人员', '操作方法', '操作地址', '操作地点', '操作状态', '请求URL', '请求方式', '请求参数', '请求返回结果', '请求错误消息', '请求耗时',
    ]
    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '操作日志导出')
    return AjaxResult.success(excelFile)
  }

  /**
   * 查看操作日志
   * @param id 
   * @returns 
   */
  async operLogInfo(id: number): Promise<AjaxResult> {
    const data = await this.operLog.findOneBy({ operId: id })
    return AjaxResult.success(data)
  }
}
