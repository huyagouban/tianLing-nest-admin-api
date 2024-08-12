import { CreateDictDataDto, UpdateDictDataDto, ListDictDataDto } from './dto/dict-data.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
import { Repository } from 'typeorm';
export declare class DictDataService {
    private readonly dictData;
    constructor(dictData: Repository<DictData>);
    dictDataAdd(dictData: CreateDictDataDto): Promise<AjaxResult>;
    dictDataList(query: ListDictDataDto): Promise<AjaxResult>;
    dictDataInfo(id: number): Promise<AjaxResult>;
    updateDictData(id: number, dictData: UpdateDictDataDto): Promise<AjaxResult>;
    deleteDictData(id: number[]): Promise<AjaxResult>;
    dictDataOption(dictType: string): Promise<AjaxResult>;
    checkDictDataLabelUnique(dict: Partial<DictData>): Promise<boolean>;
    checkDictDataValueUnique(dict: Partial<DictData>): Promise<boolean>;
    checkDictDataIdUnique(dictType: string): Promise<boolean>;
    downloadExcel(dictDataIds: number[]): Promise<AjaxResult>;
}
