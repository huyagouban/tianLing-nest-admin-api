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
exports.Dict = void 0;
const typeorm_1 = require("typeorm");
const base_time_entity_1 = require("../../../../common/public/base-time-entity");
let Dict = class Dict extends base_time_entity_1.BaseTimeEntity {
};
exports.Dict = Dict;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: '字典Id',
    }),
    __metadata("design:type", Number)
], Dict.prototype, "dictId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "dictName",
        comment: "字典名称",
    }),
    __metadata("design:type", String)
], Dict.prototype, "dictName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "dictType",
        comment: "字典类型",
    }),
    __metadata("design:type", String)
], Dict.prototype, "dictType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "status",
        default: '1',
        comment: "字典状态",
    }),
    __metadata("design:type", String)
], Dict.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "remark",
        comment: "备注",
        default: '',
    }),
    __metadata("design:type", String)
], Dict.prototype, "remark", void 0);
exports.Dict = Dict = __decorate([
    (0, typeorm_1.Entity)({ name: 'dict' })
], Dict);
//# sourceMappingURL=dict.entity.js.map