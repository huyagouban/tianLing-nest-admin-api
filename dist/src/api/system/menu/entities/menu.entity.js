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
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
let Menu = class Menu {
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        name: "parentId",
        comment: "父级id",
    }),
    __metadata("design:type", Number)
], Menu.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['M', 'C', 'F'],
        name: "menuType",
        default: 'M',
        comment: "菜单类型",
    }),
    __metadata("design:type", String)
], Menu.prototype, "menuType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "icon",
        comment: "菜单图标",
    }),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "iconType",
        comment: "菜单图标类型",
    }),
    __metadata("design:type", String)
], Menu.prototype, "iconType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "menuName",
        comment: "菜单名称",
    }),
    __metadata("design:type", String)
], Menu.prototype, "menuName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        name: "sortNum",
        comment: "显示排序",
    }),
    __metadata("design:type", Number)
], Menu.prototype, "sortNum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "isLink",
        default: '0',
        comment: "是否外链",
    }),
    __metadata("design:type", String)
], Menu.prototype, "isLink", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "path",
        comment: "路由地址",
    }),
    __metadata("design:type", String)
], Menu.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "component",
        comment: "组件路径",
    }),
    __metadata("design:type", String)
], Menu.prototype, "component", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        name: "perms",
        comment: "权限字符",
    }),
    __metadata("design:type", String)
], Menu.prototype, "perms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "isCache",
        default: '0',
        comment: "是否缓存",
    }),
    __metadata("design:type", String)
], Menu.prototype, "isCache", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "visible",
        default: '0',
        comment: "显示状态",
    }),
    __metadata("design:type", String)
], Menu.prototype, "visible", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ['0', '1',],
        name: "status",
        default: '0',
        comment: "菜单状态",
    }),
    __metadata("design:type", String)
], Menu.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Menu.prototype, "createDate", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)()
], Menu);
//# sourceMappingURL=menu.entity.js.map