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
exports.DictDataController = void 0;
const common_1 = require("@nestjs/common");
const dict_data_service_1 = require("./dict-data.service");
const dict_data_dto_1 = require("./dto/dict-data.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let DictDataController = class DictDataController {
    constructor(dictDataService) {
        this.dictDataService = dictDataService;
    }
    async dictDataAdd(datcData) {
        return await this.dictDataService.dictDataAdd(datcData);
    }
    async dictDataList(query) {
        return await this.dictDataService.dictDataList(query);
    }
    async dictDataInfo(id) {
        return await this.dictDataService.dictDataInfo(id);
    }
    async updateDictData(id, dictData) {
        return await this.dictDataService.updateDictData(id, dictData);
    }
    async deleteDictData(id) {
        return await this.dictDataService.deleteDictData(id);
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.dictDataIds.split(',').map(Number);
            return await this.dictDataService.downloadExcel(ids);
        }
        catch (error) {
            ajaxResult_1.AjaxResult.error(error);
        }
    }
    async dictDataOption(dictType) {
        return await this.dictDataService.dictDataOption(dictType);
    }
};
exports.DictDataController = DictDataController;
__decorate([
    (0, common_1.Post)('add'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_add'),
    (0, log_decorator_1.Log)({ title: '新增字典数据', operType: oper_log_enums_1.OperType.ADD }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_data_dto_1.CreateDictDataDto]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "dictDataAdd", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_data_dto_1.ListDictDataDto]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "dictDataList", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "dictDataInfo", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_edit'),
    (0, log_decorator_1.Log)({ title: '修改字典数据', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dict_data_dto_1.UpdateDictDataDto]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "updateDictData", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_delete'),
    (0, log_decorator_1.Log)({ title: '删除字典数据', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "deleteDictData", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_export'),
    (0, log_decorator_1.Log)({ title: '导出字典数据', operType: oper_log_enums_1.OperType.EXPORT }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, dict_data_dto_1.DownloadExcel]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "downloadExcel", null);
__decorate([
    (0, common_1.Get)('option/:dictType'),
    __param(0, (0, common_1.Param)('dictType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DictDataController.prototype, "dictDataOption", null);
exports.DictDataController = DictDataController = __decorate([
    (0, common_1.Controller)('dict-data'),
    __metadata("design:paramtypes", [dict_data_service_1.DictDataService])
], DictDataController);
//# sourceMappingURL=dict-data.controller.js.map