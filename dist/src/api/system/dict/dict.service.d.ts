import { CreateDictDto, ListDictDataDto, UpdateDictDto } from './dto/dict.dto';
import { Dict } from "src/api/system/dict/entities/dict.entity";
import { Repository } from 'typeorm';
import { AjaxResult } from "src/common/ajaxResult";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
export declare class DictService {
    private readonly dict;
    private dictDataService;
    constructor(dict: Repository<Dict>, dictDataService: Repository<DictData>);
    add(dict: CreateDictDto): Promise<AjaxResult>;
    dictSelectList(query: ListDictDataDto): Promise<AjaxResult>;
    dictList(query: ListDictDataDto): Promise<AjaxResult>;
    dictInfo(id: number): Promise<AjaxResult>;
    update(id: number, dict: UpdateDictDto): Promise<AjaxResult>;
    delete(ids: number[]): Promise<AjaxResult>;
    downloadExcel(dictIds: number[]): Promise<AjaxResult>;
    checkDictNameUnique(dict: Partial<Dict>): Promise<boolean>;
    checkDictTypeUnique(dict: Partial<Dict>): Promise<boolean>;
}
