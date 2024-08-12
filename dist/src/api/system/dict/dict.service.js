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
exports.DictService = void 0;
const common_1 = require("@nestjs/common");
const dict_entity_1 = require("./entities/dict.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ajaxResult_1 = require("../../../common/ajaxResult");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
const dict_data_entity_1 = require("../dict-data/entities/dict-data.entity");
const excelHeader = [
    '字典名称', '字典类型', '字典状态(正常、停用)', '备注',
];
let DictService = class DictService {
    constructor(dict, dictDataService) {
        this.dict = dict;
        this.dictDataService = dictDataService;
    }
    async add(dict) {
        if (!(await this.checkDictNameUnique(dict))) {
            return ajaxResult_1.AjaxResult.error(`新增字典${dict.dictName}失败，字典名称已存在`);
        }
        if (!(await this.checkDictTypeUnique(dict))) {
            return ajaxResult_1.AjaxResult.error(`新增字典${dict.dictName}失败，字典类型已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.dict.save(dict));
    }
    async dictSelectList(query) {
        const data = await this.dict.find();
        return ajaxResult_1.AjaxResult.success(data);
    }
    async dictList(query) {
        let endTime;
        if (query.startAndEndTime) {
            endTime = new Date(query.startAndEndTime[1]);
        }
        const toRoleId = 1;
        const paginationService = new paginationResult_utils_1.PaginationService(this.dict);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        dictName: (0, typeorm_2.Like)(`%${query.dictName ? query.dictName : ''}%`),
                        dictType: (0, typeorm_2.Like)(`%${query.dictType ? query.dictType : ''}%`),
                        status: (0, typeorm_2.Like)(`%${query.status ? query.status : ''}%`),
                        createDate: query.startAndEndTime ? (0, typeorm_2.Between)(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
                    },],
                order: {
                    createDate: "ASC",
                }
            },
        });
        return ajaxResult_1.AjaxResult.success(res);
    }
    async dictInfo(id) {
        const data = await this.dict.findOneBy({ dictId: id });
        return ajaxResult_1.AjaxResult.success(data);
    }
    async update(id, dict) {
        const info = await this.dict.findOneBy({ dictId: id });
        if (!(await this.checkDictNameUnique(info))) {
            return ajaxResult_1.AjaxResult.error(`新增字典${dict.dictName}失败，字典名称已存在`);
        }
        if (!(await this.checkDictTypeUnique(info))) {
            return ajaxResult_1.AjaxResult.error(`新增字典${dict.dictName}失败，字典类型已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.dict.update(id, dict), "修改成功");
    }
    async delete(ids) {
        for (const dictId of ids) {
            const { dictType, dictName } = await this.dict.findOneBy({ dictId });
            const count = await this.dictDataService.countBy({ dictType });
            if (count > 0) {
                return ajaxResult_1.AjaxResult.error(`${dictName}已分配,不能删除`);
            }
        }
        return ajaxResult_1.AjaxResult.success(await this.dict.delete(ids), '删除成功');
    }
    async downloadExcel(dictIds) {
        const list = await this.dict.find({
            where: {
                dictId: (0, typeorm_2.In)(dictIds)
            }
        });
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.dictId;
            item.status = item.status === '1' ? '正常' : '停用';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量字典导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async checkDictNameUnique(dict) {
        const { dictId, dictName } = dict;
        const info = await this.dict.findOneBy({ dictName });
        if (info && info.dictId !== dictId) {
            return false;
        }
        return true;
    }
    async checkDictTypeUnique(dict) {
        const { dictId, dictType } = dict;
        const info = await this.dict.findOneBy({ dictType });
        if (info && info.dictId !== dictId) {
            return false;
        }
        return true;
    }
};
exports.DictService = DictService;
exports.DictService = DictService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_entity_1.Dict)),
    __param(1, (0, typeorm_1.InjectRepository)(dict_data_entity_1.DictData)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DictService);
//# sourceMappingURL=dict.service.js.map