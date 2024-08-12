import { DictDataService } from './dict-data.service';
import { CreateDictDataDto, UpdateDictDataDto, ListDictDataDto, DownloadExcel } from './dto/dict-data.dto';
import { AjaxResult } from "src/common/ajaxResult";
export declare class DictDataController {
    private readonly dictDataService;
    constructor(dictDataService: DictDataService);
    dictDataAdd(datcData: CreateDictDataDto): Promise<AjaxResult>;
    dictDataList(query: ListDictDataDto): Promise<AjaxResult>;
    dictDataInfo(id: number): Promise<AjaxResult>;
    updateDictData(id: number, dictData: UpdateDictDataDto): Promise<AjaxResult<any>>;
    deleteDictData(id: number[]): Promise<AjaxResult>;
    downloadExcel(response: Response, query: DownloadExcel): Promise<AjaxResult>;
    dictDataOption(dictType: string): Promise<AjaxResult>;
}
