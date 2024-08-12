"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictDataService = void 0;
const common_1 = require("@nestjs/common");
const ajaxResult_1 = require("../../../common/ajaxResult");
const dict_data_entity_1 = require("./entities/dict-data.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
const excelHeader = [
    '字典类型', '字典标签', '字典键值', '字典顺序', '字典状态(正常、停用)', '备注',
];
let DictDataService = class DictDataService {
    constructor(dictData) {
        this.dictData = dictData;
    }
    async dictDataAdd(dictData) {
        if (!dictData.dictType) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典类型不能为空`);
        }
        if (!(await this.checkDictDataLabelUnique(dictData))) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典标签已存在`);
        }
        if (!(await this.checkDictDataValueUnique(dictData))) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${dictData.dictDataValue}失败，字典键值已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.dictData.save(dictData));
    }
    async dictDataList(query) {
        const paginationService = new paginationResult_utils_1.PaginationService(this.dictData);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        dictDataLabel: (0, typeorm_2.Like)(`%${query.dictDataLabel ? query.dictDataLabel : ''}%`),
                        dictType: (0, typeorm_2.Like)(`%${query.dictType ? query.dictType : ''}%`),
                        status: (0, typeorm_2.Like)(`%${query.status ? query.status : ''}%`),
                    },],
                order: {
                    sortNum: "ASC",
                }
            },
        });
        return ajaxResult_1.AjaxResult.success(res);
    }
    async dictDataInfo(id) {
        return ajaxResult_1.AjaxResult.success(await this.dictData.findOneBy({ dictDataId: id }));
    }
    async updateDictData(id, dictData) {
        if (!dictData.dictType) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${dictData.dictDataLabel}失败，字典Id不能为空`);
        }
        const info = await this.dictData.findOneBy({ dictDataId: id });
        if (!(await this.checkDictDataLabelUnique(info))) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${info.dictDataLabel}失败，字典标签已存在`);
        }
        if (!(await this.checkDictDataValueUnique(info))) {
            return ajaxResult_1.AjaxResult.error(`新增字典数据${info.dictDataValue}失败，字典键值已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.dictData.update(id, dictData), '修改成功');
    }
    async deleteDictData(id) {
        return ajaxResult_1.AjaxResult.success(await this.dictData.delete(id), '删除成功');
    }
    async dictDataOption(dictType) {
        const data = await this.dictData.find({
            where: {
                dictType: dictType,
                status: '1'
            },
            order: {
                sortNum: "ASC",
            }
        });
        return ajaxResult_1.AjaxResult.success(data);
    }
    async checkDictDataLabelUnique(dict) {
        const { dictDataId, dictDataLabel, dictType } = dict;
        const info = await this.dictData.findOneBy({ dictDataLabel, dictType });
        if (info && info.dictDataId !== dictDataId) {
            return false;
        }
        return true;
    }
    async checkDictDataValueUnique(dict) {
        const { dictDataId, dictDataValue, dictType } = dict;
        const info = await this.dictData.findOneBy({ dictDataValue, dictType });
        if (info && info.dictDataId !== dictDataId) {
            return false;
        }
        return true;
    }
    async checkDictDataIdUnique(dictType) {
        const info = await this.dictData.find({ where: { dictType } });
        if (info && info.length > 0) {
            return false;
        }
        return true;
    }
    async downloadExcel(dictDataIds) {
        const list = await this.dictData.find({
            where: {
                dictDataId: (0, typeorm_2.In)(dictDataIds)
            }
        });
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.dictDataId;
            item.status = item.status === '1' ? '正常' : '停用';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量字典导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
};
exports.DictDataService = DictDataService;
exports.DictDataService = DictDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_data_entity_1.DictData)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DictDataService);
//# sourceMappingURL=dict-data.service.js.map