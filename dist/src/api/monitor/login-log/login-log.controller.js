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
exports.LoginLogController = void 0;
const common_1 = require("@nestjs/common");
const login_log_service_1 = require("./login-log.service");
const login_log_dto_1 = require("./dto/login-log.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
let LoginLogController = class LoginLogController {
    constructor(loginLogService) {
        this.loginLogService = loginLogService;
    }
    async loginLogList(query) {
        return await this.loginLogService.loginLogList(query);
    }
    async loginLogDelete(id) {
        return await this.loginLogService.loginLogDelete(id);
    }
    async loginLogClear() {
        return await this.loginLogService.loginLogClear();
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.loginLogIds ? query.loginLogIds.split(',').map(Number) : undefined;
            return await this.loginLogService.downloadExcel(ids);
        }
        catch (error) {
            ajaxResult_1.AjaxResult.error(error);
        }
    }
};
exports.LoginLogController = LoginLogController;
__decorate([
    (0, common_1.Get)('list'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_loginLog_list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_log_dto_1.ListLoginLogDto]),
    __metadata("design:returntype", Promise)
], LoginLogController.prototype, "loginLogList", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_loginLog_delete'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LoginLogController.prototype, "loginLogDelete", null);
__decorate([
    (0, common_1.Delete)('clear'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_loginLog_clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoginLogController.prototype, "loginLogClear", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_loginLog_export'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, login_log_dto_1.DownloadExcel]),
    __metadata("design:returntype", Promise)
], LoginLogController.prototype, "downloadExcel", null);
exports.LoginLogController = LoginLogController = __decorate([
    (0, common_1.Controller)('login-log'),
    __metadata("design:paramtypes", [login_log_service_1.LoginLogService])
], LoginLogController);
//# sourceMappingURL=login-log.controller.js.map