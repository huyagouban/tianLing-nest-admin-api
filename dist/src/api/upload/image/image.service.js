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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const ajaxResult_1 = require("../../../common/ajaxResult");
const user_service_1 = require("../../system/user/user.service");
let UploadService = class UploadService {
    constructor(userService) {
        this.userService = userService;
    }
    async uploadAvatar(file, userId) {
        const avatarUrl = `/images/${file.filename}`;
        const updateAvatar = {
            userId: userId,
            avatar: avatarUrl
        };
        await this.userService.updateBasicInfo(updateAvatar);
        const data = {
            avatar: avatarUrl
        };
        return ajaxResult_1.AjaxResult.success(data);
    }
    async uploadImage(file) {
        const fileUrl = `/images/${file.filename}`;
        const data = {
            fileUrl: fileUrl
        };
        return ajaxResult_1.AjaxResult.success(data);
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UploadService);
//# sourceMappingURL=image.service.js.map