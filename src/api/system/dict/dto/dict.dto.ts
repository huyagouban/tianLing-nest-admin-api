
import { PagesDto } from "src/common/public/base-pages-entity";
import { Dict } from "src/api/system/dict/entities/dict.entity";

/**
 * 查询字典数据
 */
export class ListDictDataDto extends PagesDto {
    /** 字典类型 */
    dictType?: string

    /** 字典名称 */
    dictName?: string

    /** 字典状态（0正常 1停用） */
    status?: string

    //创建时间段，以逗号分隔的字符串
    startAndEndTime: string[]
}


/**
* 添加字典数据
*/
export class CreateDictDto extends Dict { }


/**
 * 更新字典数据
 */
export class UpdateDictDto extends Dict { }


/**
 * 导出字典数据
 */
export class DownloadExcel {
    /** 字典ID或者以逗号分隔的字符串 */
    dictIds: string;
}
