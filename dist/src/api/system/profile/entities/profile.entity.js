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
exports.UpdatePasswordDto = exports.UpdateProfileDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../user/entities/user.entity");
const profile_vo_1 = require("../vo/profile.vo");
class UpdateProfileDto extends profile_vo_1.ProfileInfoVo {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "nickName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)('zh-CN'),
    (0, class_validator_1.MaxLength)(11),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['0', '1',]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "sex", void 0);
class UpdatePasswordDto extends user_entity_1.User {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=profile.entity.js.map