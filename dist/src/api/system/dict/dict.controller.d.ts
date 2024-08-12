import { DictService } from './dict.service';
import { ListDictDataDto, CreateDictDto, DownloadExcel } from './dto/dict.dto';
import { AjaxResult } from "src/common/ajaxResult";
export declare class DictController {
    private readonly dictService;
    constructor(dictService: DictService);
    dictAdd(dict: CreateDictDto): Promise<AjaxResult>;
    dictList(query: ListDictDataDto): Promise<AjaxResult>;
    dictInfo(id: number): Promise<AjaxResult>;
    update(id: string, updateDictDto: any): Promise<AjaxResult>;
    delete(id: number[]): Promise<AjaxResult>;
    downloadExcel(response: Response, query: DownloadExcel): Promise<AjaxResult>;
    dictSelectList(query: ListDictDataDto): Promise<AjaxResult>;
}
