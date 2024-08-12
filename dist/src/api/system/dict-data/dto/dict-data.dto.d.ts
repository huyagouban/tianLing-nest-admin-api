import { PagesDto } from "src/common/public/base-pages-entity";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
export declare class ListDictDataDto extends PagesDto {
    dictDataLabel?: string;
    dictType?: string;
    status?: string;
}
export declare class CreateDictDataDto extends DictData {
}
export declare class UpdateDictDataDto extends DictData {
}
export declare class DownloadExcel {
    dictDataIds: string;
}
