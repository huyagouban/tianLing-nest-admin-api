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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const base_time_entity_1 = require("../../../../common/public/base-time-entity");
let Role = class Role extends base_time_entity_1.BaseTimeEntity {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "roleName",
        comment: "角色名称",
    }),
    __metadata("design:type", String)
], Role.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "roleKey",
        comment: "权限字符",
    }),
    __metadata("design:type", String)
], Role.prototype, "roleKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        name: "roleSort",
        comment: "角色顺序",
    }),
    __metadata("design:type", Number)
], Role.prototype, "roleSort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "status",
        default: '1',
        comment: "用户状态",
    }),
    __metadata("design:type", String)
], Role.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
    }),
    __metadata("design:type", String)
], Role.prototype, "remark", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)()
], Role);
//# sourceMappingURL=role.entity.js.map