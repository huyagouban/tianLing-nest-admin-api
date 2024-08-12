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
exports.DownloadExcel = exports.CreateLoginLogDto = exports.ListLoginLogDto = void 0;
const base_pages_entity_1 = require("../../../../common/public/base-pages-entity");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const login_log_entity_1 = require("../entities/login-log.entity");
class ListLoginLogDto extends base_pages_entity_1.PagesDto {
}
exports.ListLoginLogDto = ListLoginLogDto;
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListLoginLogDto.prototype, "loginName", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListLoginLogDto.prototype, "loginStatus", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Array)
], ListLoginLogDto.prototype, "createTime", void 0);
class CreateLoginLogDto extends (0, mapped_types_1.OmitType)(login_log_entity_1.LoginLog, ['loginId']) {
}
exports.CreateLoginLogDto = CreateLoginLogDto;
class DownloadExcel {
}
exports.DownloadExcel = DownloadExcel;
//# sourceMappingURL=login-log.dto.js.map