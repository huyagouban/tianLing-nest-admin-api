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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const ajaxResult_1 = require("../../../common/ajaxResult");
const profile_entity_1 = require("./entities/profile.entity");
const passport_jwt_1 = require("passport-jwt");
const jwt_1 = require("@nestjs/jwt");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let ProfileController = class ProfileController {
    constructor(profileService, jwtService) {
        this.profileService = profileService;
        this.jwtService = jwtService;
    }
    async profile(req) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const jwtKey = await this.jwtService.verify(token);
        return ajaxResult_1.AjaxResult.success(await this.profileService.profile(jwtKey.userId));
    }
    async updateUserInfo(user) {
        return await this.profileService.updateUserInfo(user);
    }
    async updatePassword(user) {
        return await this.profileService.updatePassword(user);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "profile", null);
__decorate([
    (0, common_1.Put)('updateUserInfo'),
    (0, log_decorator_1.Log)({ title: '修改个人基本信息', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_entity_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.Put)('UpdatePassword'),
    (0, log_decorator_1.Log)({ title: '修改个人密码', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_entity_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updatePassword", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        jwt_1.JwtService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map