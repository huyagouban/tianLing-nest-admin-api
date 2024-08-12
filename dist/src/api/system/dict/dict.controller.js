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
exports.DictController = void 0;
const common_1 = require("@nestjs/common");
const dict_service_1 = require("./dict.service");
const dict_dto_1 = require("./dto/dict.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let DictController = class DictController {
    constructor(dictService) {
        this.dictService = dictService;
    }
    async dictAdd(dict) {
        return await this.dictService.add(dict);
    }
    async dictList(query) {
        return await this.dictService.dictList(query);
    }
    async dictInfo(id) {
        return await this.dictService.dictInfo(id);
    }
    async update(id, updateDictDto) {
        return await this.dictService.update(+id, updateDictDto);
    }
    async delete(id) {
        return await this.dictService.delete(id);
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.dictIds.split(',').map(Number);
            return await this.dictService.downloadExcel(ids);
        }
        catch (error) {
            ajaxResult_1.AjaxResult.error(error);
        }
    }
    async dictSelectList(query) {
        return await this.dictService.dictSelectList(query);
    }
};
exports.DictController = DictController;
__decorate([
    (0, common_1.Post)('add'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_add'),
    (0, log_decorator_1.Log)({ title: '新增字典', operType: oper_log_enums_1.OperType.ADD }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_dto_1.CreateDictDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictAdd", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_dto_1.ListDictDataDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictList", null);
__decorate([
    (0, common_1.Get)('dictInfo/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_query'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictInfo", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_edit'),
    (0, log_decorator_1.Log)({ title: '修改字典', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_delete'),
    (0, log_decorator_1.Log)({ title: '删除字典', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_dict_export'),
    (0, log_decorator_1.Log)({ title: '导出字典', operType: oper_log_enums_1.OperType.EXPORT }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, dict_dto_1.DownloadExcel]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "downloadExcel", null);
__decorate([
    (0, common_1.Get)('selectList'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_dto_1.ListDictDataDto]),
    __metadata("design:returntype", Promise)
], DictController.prototype, "dictSelectList", null);
exports.DictController = DictController = __decorate([
    (0, common_1.Controller)('dict'),
    __metadata("design:paramtypes", [dict_service_1.DictService])
], DictController);
//# sourceMappingURL=dict.controller.js.map