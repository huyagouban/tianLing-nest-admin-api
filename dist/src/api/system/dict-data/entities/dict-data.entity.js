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
exports.DictData = void 0;
const typeorm_1 = require("typeorm");
const base_time_entity_1 = require("../../../../common/public/base-time-entity");
let DictData = class DictData extends base_time_entity_1.BaseTimeEntity {
};
exports.DictData = DictData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DictData.prototype, "dictDataId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "dictType",
        comment: "字典类型",
    }),
    __metadata("design:type", String)
], DictData.prototype, "dictType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "dictDataLabel",
        comment: "字典标签",
    }),
    __metadata("design:type", String)
], DictData.prototype, "dictDataLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "dictDataValue",
        comment: "字典键值",
    }),
    __metadata("design:type", String)
], DictData.prototype, "dictDataValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        name: "sortNum",
        comment: "字典顺序",
    }),
    __metadata("design:type", Number)
], DictData.prototype, "sortNum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "status",
        default: '1',
        comment: "字典状态",
    }),
    __metadata("design:type", String)
], DictData.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "cssClass",
        comment: "回显样式",
    }),
    __metadata("design:type", String)
], DictData.prototype, "cssClass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
        default: '',
    }),
    __metadata("design:type", String)
], DictData.prototype, "remark", void 0);
exports.DictData = DictData = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_dict_data' })
], DictData);
//# sourceMappingURL=dict-data.entity.js.map