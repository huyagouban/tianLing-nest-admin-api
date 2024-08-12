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
exports.OperLog = void 0;
const base_time_entity_1 = require("../../../../common/public/base-time-entity");
const base_status_enums_1 = require("../../../../common/public/base-status.enums");
const oper_log_enums_1 = require("../../../../common/class/oper-log-enums");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let OperLog = class OperLog extends base_time_entity_1.BaseTimeEntity {
};
exports.OperLog = OperLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'operId',
        type: 'int',
        comment: '日志编号',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OperLog.prototype, "operId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        type: 'varchar',
        length: 50,
        comment: '模块标题',
    }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operType',
        type: 'char',
        length: 2,
        comment: '操作类型',
    }),
    (0, class_validator_1.IsEnum)(oper_log_enums_1.OperType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "operType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operName',
        type: 'varchar',
        length: 50,
        comment: '操作人员',
    }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "operName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operMethod',
        type: 'varchar',
        length: 100,
        comment: '操作方法',
    }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "operMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operIp',
        type: 'varchar',
        length: 128,
        nullable: true,
        comment: '操作地址',
    }),
    (0, class_validator_1.MaxLength)(128),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "operIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operLocation',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '操作地点',
    }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "operLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operStatus',
        type: 'char',
        length: 1,
        comment: '操作状态',
    }),
    (0, class_validator_1.IsEnum)(base_status_enums_1.BaseStatusEnums),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "operStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requestUrl',
        type: 'varchar',
        length: 1000,
        comment: '请求URL',
    }),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "requestUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requestMethod',
        type: 'varchar',
        length: 10,
        comment: '请求方式',
    }),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperLog.prototype, "requestMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requestParam',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求参数',
    }),
    (0, class_validator_1.MaxLength)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "requestParam", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requestResult',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求返回结果',
    }),
    (0, class_validator_1.MaxLength)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "requestResult", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requestErrmsg',
        type: 'varchar',
        length: 2000,
        nullable: true,
        comment: '请求错误消息',
    }),
    (0, class_validator_1.MaxLength)(2000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "requestErrmsg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'costTime',
        type: 'varchar',
        length: 10,
        nullable: true,
        comment: '请求耗时',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OperLog.prototype, "costTime", void 0);
exports.OperLog = OperLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'monitor_oper_log' })
], OperLog);
//# sourceMappingURL=oper-log.entity.js.map