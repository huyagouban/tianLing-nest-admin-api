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
exports.OnlineController = void 0;
const common_1 = require("@nestjs/common");
const online_service_1 = require("./online.service");
const online_dto_1 = require("./dto/online.dto");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
let OnlineController = class OnlineController {
    constructor(onlineService) {
        this.onlineService = onlineService;
    }
    async onlineList(query) {
        return await this.onlineService.onlineList(query);
    }
    async logout(userId) {
        return await this.onlineService.logout(userId);
    }
};
exports.OnlineController = OnlineController;
__decorate([
    (0, common_1.Get)('list'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_online_list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [online_dto_1.ListOnlineDto]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "onlineList", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    (0, require_permissions_decorator_1.RequirePermissions)('monitor_online_logout'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "logout", null);
exports.OnlineController = OnlineController = __decorate([
    (0, common_1.Controller)('online'),
    __metadata("design:paramtypes", [online_service_1.OnlineService])
], OnlineController);
//# sourceMappingURL=online.controller.js.map