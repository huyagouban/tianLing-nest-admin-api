import { PagesDto } from "src/common/public/base-pages-entity";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";


/**
 * 查询字典数据
 */
export class ListDictDataDto extends PagesDto {
    /** 字典标签 */
    dictDataLabel?: string

    /**
    * 字典类型
    */
    dictType?: string


    /** 字典状态（0正常 1停用） */
    status?: string

}


/**
* 添加字典数据
*/
export class CreateDictDataDto extends DictData { }


/**
 * 更新字典数据
 */
export class UpdateDictDataDto extends DictData { }


/**
 * 导出字典数据
 */
export class DownloadExcel {
    /** 字典数据ID或者以逗号分隔的字符串 */
    dictDataIds: string;
}
