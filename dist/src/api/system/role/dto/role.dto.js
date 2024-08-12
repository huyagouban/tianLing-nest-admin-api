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
exports.UpdateRoleDto = exports.ListRoleDto = exports.CreateRoleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const role_entity_1 = require("../entities/role.entity");
const base_pages_entity_1 = require("../../../../common/public/base-pages-entity");
class CreateRoleDto extends (0, mapped_types_1.OmitType)(role_entity_1.Role, ['roleId']) {
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "menuIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "deptIds", void 0);
class ListRoleDto extends base_pages_entity_1.PagesDto {
}
exports.ListRoleDto = ListRoleDto;
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListRoleDto.prototype, "roleName", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListRoleDto.prototype, "roleKey", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListRoleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], ListRoleDto.prototype, "roleIds", void 0);
class UpdateRoleDto extends (0, mapped_types_1.OmitType)(role_entity_1.Role, []) {
}
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateRoleDto.prototype, "menuIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateRoleDto.prototype, "deptIds", void 0);
//# sourceMappingURL=role.dto.js.map