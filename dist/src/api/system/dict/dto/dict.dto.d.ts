import { PagesDto } from "src/common/public/base-pages-entity";
import { Dict } from "src/api/system/dict/entities/dict.entity";
export declare class ListDictDataDto extends PagesDto {
    dictType?: string;
    dictName?: string;
    status?: string;
    startAndEndTime: string[];
}
export declare class CreateDictDto extends Dict {
}
export declare class UpdateDictDto extends Dict {
}
export declare class DownloadExcel {
    dictIds: string;
}
