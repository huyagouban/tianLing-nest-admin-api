import { Injectable } from '@nestjs/common';
import { CreateDictDto, ListDictDataDto, UpdateDictDto } from './dto/dict.dto';
import { Dict } from "src/api/system/dict/entities/dict.entity";
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { AjaxResult } from "src/common/ajaxResult";
import { PaginationService } from "src/utils/PaginationResult/paginationResult.utils";
import { DownloadExcelService } from "src/utils/ExcelService/ExcelService.utils";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
const excelHeader = [
  '字典名称', '字典类型', '字典状态(正常、停用)', '备注',
]
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict) private readonly dict: Repository<Dict>,
    @InjectRepository(DictData)
    private dictDataService: Repository<DictData>,
  ) { }
  /**
   * 添加字典
   * @param dict 
   */
  async add(dict: CreateDictDto): Promise<AjaxResult> {
    if (!(await this.checkDictNameUnique(dict))) {
      return AjaxResult.error(`新增字典${dict.dictName}失败，字典名称已存在`)
    }

    if (!(await this.checkDictTypeUnique(dict))) {
      return AjaxResult.error(`新增字典${dict.dictName}失败，字典类型已存在`)
    }

    return AjaxResult.success(await this.dict.save(dict));
  }
  /**
   * 获取字典列表无分页
   * @param query 
   */
  async dictSelectList(query: ListDictDataDto): Promise<AjaxResult> {
    const data = await this.dict.find()

    return AjaxResult.success(data)
  }
  /**
   * 获取字典列表
   * @param query 
   */
  async dictList(query: ListDictDataDto): Promise<AjaxResult> {
    let endTime;
    // 判断是否传了创建时间区间
    if (query.startAndEndTime) {
      endTime = new Date(query.startAndEndTime[1])
    }
    // 置顶ID
    const toRoleId = 1;
    const paginationService = new PaginationService<Dict>(
      this.dict,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          dictName: Like(`%${query.dictName ? query.dictName : ''}%`),
          dictType: Like(`%${query.dictType ? query.dictType : ''}%`),
          status: Like(`%${query.status ? query.status : ''}%`),
          createDate: query.startAndEndTime ? Between(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
        },],
        order: {
          createDate: "ASC",
        }
      },
    });

    return AjaxResult.success(res);
  }
  /**
   * 获取字典详情
   * @param id 
   */
  async dictInfo(id: number): Promise<AjaxResult> {

    const data = await this.dict.findOneBy({ dictId: id });
    return AjaxResult.success(data);
  }
  /**
   * 修改字典
   * @param id 
   * @param dict 
   */
  async update(id: number, dict: UpdateDictDto): Promise<AjaxResult> {

    const info = await this.dict.findOneBy({ dictId: id });
    if (!(await this.checkDictNameUnique(info))) {
      return AjaxResult.error(`新增字典${dict.dictName}失败，字典名称已存在`)
    }

    if (!(await this.checkDictTypeUnique(info))) {
      return AjaxResult.error(`新增字典${dict.dictName}失败，字典类型已存在`)
    }
    return AjaxResult.success(await this.dict.update(id, dict), "修改成功");
  }
  /**
   * 删除字典
   * @param ids
   */
  async delete(ids: number[]): Promise<AjaxResult> {
    for (const dictId of ids) {
      const { dictType,dictName } = await this.dict.findOneBy({ dictId })
      const count = await this.dictDataService.countBy({ dictType })
      if (count > 0) {
        return AjaxResult.error(`${dictName}已分配,不能删除`)
      }
    }
    return AjaxResult.success(await this.dict.delete(ids), '删除成功');
  }

  /**导出excel */
  async downloadExcel(dictIds: number[]): Promise<AjaxResult> {
    /**
     * 1.查询数据
     * 2.导出excel
     */
    const list = await this.dict.find({
      where: {
        dictId: In(dictIds)
      }
    })
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.dictId
      item.status = item.status === '1' ? '正常' : '停用'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()


    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量字典导出')

    return AjaxResult.success(excelFile)
  }

  /**
   * 校验字典名称是否唯一
   * @param dictTypeDto 字典类型信息
   * @returns true 唯一 / false 不唯一
   */
  async checkDictNameUnique(dict: Partial<Dict>): Promise<boolean> {
    const { dictId, dictName } = dict

    const info = await this.dict.findOneBy({ dictName })
    if (info && info.dictId !== dictId) {
      return false
    }

    return true
  }

  /**
 * 校验字典类型是否唯一
 * @param dictTypeDto 字典类型信息
 * @returns true 唯一 / false 不唯一
 */
  async checkDictTypeUnique(dict: Partial<Dict>): Promise<boolean> {
    const { dictId, dictType } = dict

    const info = await this.dict.findOneBy({ dictType })
    if (info && info.dictId !== dictId) {
      return false
    }

    return true
  }
}
