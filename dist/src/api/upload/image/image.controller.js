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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const image_service_1 = require("./image.service");
const platform_express_1 = require("@nestjs/platform-express");
const passport_jwt_1 = require("passport-jwt");
const login_service_1 = require("../../login/login.service");
let UploadController = class UploadController {
    constructor(uploadService, loginService) {
        this.uploadService = uploadService;
        this.loginService = loginService;
    }
    async uploadAvatar(file, req) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const jwtKey = this.loginService.parseToken(token);
        return await this.uploadService.uploadAvatar(file, jwtKey.userId);
    }
    async uploadImage(file) {
        return await this.uploadService.uploadImage(file);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('uploadAvatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatarfile')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('uploadImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [image_service_1.UploadService,
        login_service_1.LoginService])
], UploadController);
//# sourceMappingURL=image.controller.js.map