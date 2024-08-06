import { Injectable } from '@nestjs/common';
import { CreateDictDataDto, UpdateDictDataDto, ListDictDataDto } from './dto/dict-data.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { PaginationService } from "src/utils/PaginationResult/paginationResult.utils";
import { DownloadExcelService } from "src/utils/ExcelService/ExcelService.utils";
const excelHeader = [
  '字典类型', '字典标签', '字典键值', '字典顺序', '字典状态(正常、停用)', '备注',
]
@Injectable()
export class DictDataService {

  constructor(@InjectRepository(DictData) private readonly dictData: Repository<DictData>) { }

  /**
   * 新增字典数据
   * @param dictData 字典数据
   * @returns
   */
  async dictDataAdd(dictData: CreateDictDataDto): Promise<AjaxResult> {

    if (!dictData.dictType) {
      return AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典类型不能为空`)
    }

    if (!(await this.checkDictDataLabelUnique(dictData))) {
      return AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典标签已存在`)
    }

    if (!(await this.checkDictDataValueUnique(dictData))) {
      return AjaxResult.error(`新增字典数据${dictData.dictDataValue}失败，字典键值已存在`)
    }

    return AjaxResult.success(await this.dictData.save(dictData));
  }

  /**
   * 获取字典数据
   * @param dictData 字典数据
   * @returns
   */
  async dictDataList(query: ListDictDataDto): Promise<AjaxResult> {
    const paginationService = new PaginationService<DictData>(
      this.dictData,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          dictDataLabel: Like(`%${query.dictDataLabel ? query.dictDataLabel : ''}%`),
          dictType: Like(`%${query.dictType ? query.dictType : ''}%`),
          status: Like(`%${query.status ? query.status : ''}%`),
        },],
        order: {
          sortNum: "ASC",
        }
      },
    });

    return AjaxResult.success(res);
  }

  /**
   * 获取字典数据详情
   * @param dictData 字典数据
   * @returns
   */
  async dictDataInfo(id: number): Promise<AjaxResult> {
    return AjaxResult.success(await this.dictData.findOneBy({ dictDataId: id }));
  }

  /**
   * 更新字典数据
   * @param dictData 字典数据
   * @returns
   */
  async updateDictData(id: number, dictData: UpdateDictDataDto): Promise<AjaxResult> {

    if (!dictData.dictType) {
      return AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典Id不能为空`)
    }

    const info = await this.dictData.findOneBy({ dictDataId: id })

    if (!(await this.checkDictDataLabelUnique(info))) {
      return AjaxResult.error(`新增字典数据${info.dictDataLabel}失败，字典标签已存在`)
    }

    if (!(await this.checkDictDataValueUnique(info))) {
      return AjaxResult.error(`新增字典数据${info.dictDataValue}失败，字典键值已存在`)
    }
    return AjaxResult.success(await this.dictData.update(id, dictData), '修改成功');

  }

  /**
   * 删除字典数据
   * @param id 字典数据id
   * @returns
   */
  async deleteDictData(id: number[]): Promise<AjaxResult> {
    return AjaxResult.success(await this.dictData.delete(id), '删除成功');
  }

  /**
   * 获取字典数据下拉列表
   * @param dictType 字典类型
   * @returns
   */
  async dictDataOption(dictType: string): Promise<AjaxResult> {
    const data = await this.dictData.find({
      where: {
        dictType: dictType,
        status: '1'
      },
      order: {
        sortNum: "ASC",
      }
    })
    return AjaxResult.success(data);
  }

  /**
 * 校验字典标签是否唯一
 * @param dict 字典类型信息
 * @returns true 唯一 / false 不唯一
 */
  async checkDictDataLabelUnique(dict: Partial<DictData>): Promise<boolean> {
    const { dictDataId, dictDataLabel, dictType } = dict

    const info = await this.dictData.findOneBy({ dictDataLabel, dictType })
    if (info && info.dictDataId !== dictDataId) {
      return false
    }

    return true
  }

  /**
 * 校验字典键值是否唯一
 * @param dict 字典类型信息
 * @returns true 唯一 / false 不唯一
 */
  async checkDictDataValueUnique(dict: Partial<DictData>): Promise<boolean> {
    const { dictDataId, dictDataValue, dictType } = dict

    const info = await this.dictData.findOneBy({ dictDataValue, dictType })
    if (info && info.dictDataId !== dictDataId) {
      return false
    }

    return true
  }

  /**
* 校验字典数据是否绑定
* @param dictType 字典类型
* @returns true 唯一 / false 不唯一
*/
  async checkDictDataIdUnique(dictType: string): Promise<boolean> {
    const info = await this.dictData.find({ where: { dictType } })
    if (info && info.length > 0) {
      return false
    }
    return true
  }
  /**导出excel */
  async downloadExcel(dictDataIds: number[]): Promise<AjaxResult> {
    /**
     * 1.查询数据
     * 2.导出excel
     */
    const list = await this.dictData.find({
      where: {
        dictDataId: In(dictDataIds)
      }
    })
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.dictDataId
      item.status = item.status === '1' ? '正常' : '停用'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()
    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量字典导出')
    return AjaxResult.success(excelFile)
  }
}
