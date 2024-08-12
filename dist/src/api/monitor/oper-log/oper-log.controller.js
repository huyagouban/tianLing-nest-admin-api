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
exports.OperLogController = void 0;
const common_1 = require("@nestjs/common");
const oper_log_service_1 = require("./oper-log.service");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const oper_log_dto_1 = require("./dto/oper-log.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let OperLogController = class OperLogController {
    constructor(operLogService) {
        this.operLogService = operLogService;
    }
    async operLogList(query) {
        return await this.operLogService.operLogList(query);
    }
    async operLogDelete(id) {
        return await this.operLogService.operLogDelete(id);
    }
    async operLogClear() {
        return await this.operLogService.operLogClear();
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.operIds ? query.operIds.split(',').map(Number) : undefined;
            return await this.operLogService.downloadExcel(ids);
        }
        catch (error) {
            ajaxResult_1.AjaxResult.error(error);
        }
    }
    async operLogInfo(id) {
        return await this.operLogService.operLogInfo(id);
    }
};
exports.OperLogController = OperLogController;
__decorate([
    (0, common_1.Get)('list'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_operLog_list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [oper_log_dto_1.ListOperLogDto]),
    __metadata("design:returntype", Promise)
], OperLogController.prototype, "operLogList", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_operLog_delete'),
    (0, log_decorator_1.Log)({ title: '删除操作日志', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OperLogController.prototype, "operLogDelete", null);
__decorate([
    (0, common_1.Delete)('clear'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_operLog_clear'),
    (0, log_decorator_1.Log)({ title: '清空操作日志', operType: oper_log_enums_1.OperType.CLEAN }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperLogController.prototype, "operLogClear", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_operLog_export'),
    (0, log_decorator_1.Log)({ title: '导出操作日志', operType: oper_log_enums_1.OperType.EXPORT }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, oper_log_dto_1.OperLogDownloadExcel]),
    __metadata("design:returntype", Promise)
], OperLogController.prototype, "downloadExcel", null);
__decorate([
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperLogController.prototype, "operLogInfo", null);
exports.OperLogController = OperLogController = __decorate([
    (0, common_1.Controller)('oper-log'),
    __metadata("design:paramtypes", [oper_log_service_1.OperLogService])
], OperLogController);
//# sourceMappingURL=oper-log.controller.js.map