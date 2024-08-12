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
exports.LoginLog = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const base_time_entity_1 = require("../../../../common/public/base-time-entity");
const base_status_enums_1 = require("../../../../common/public/base-status.enums");
let LoginLog = class LoginLog extends base_time_entity_1.BaseTimeEntity {
};
exports.LoginLog = LoginLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'loginId',
        type: 'int',
        comment: '登录ID',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LoginLog.prototype, "loginId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loginName',
        type: 'varchar',
        length: 50,
        comment: '用户账号',
    }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginLog.prototype, "loginName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loginStatus',
        type: 'char',
        length: 1,
        comment: '登录状态',
    }),
    (0, class_validator_1.IsEnum)(base_status_enums_1.BaseStatusEnums),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginLog.prototype, "loginStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loginIp',
        type: 'varchar',
        length: 128,
        nullable: true,
        comment: 'IP地址',
    }),
    (0, class_validator_1.MaxLength)(128),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "loginIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loginLocation',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '登录地点',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "loginLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loginMessage',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作信息',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "loginMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userAgent',
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: '用户代理',
    }),
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'browser',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '浏览器',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'os',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作系统',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLog.prototype, "os", void 0);
exports.LoginLog = LoginLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_login_log' })
], LoginLog);
//# sourceMappingURL=login-log.entity.js.map