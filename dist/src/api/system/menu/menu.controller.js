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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const passport_jwt_1 = require("passport-jwt");
const jwt_1 = require("@nestjs/jwt");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let MenuController = class MenuController {
    constructor(menuService, jwtService) {
        this.menuService = menuService;
        this.jwtService = jwtService;
    }
    create(createMenuDto) {
        return this.menuService.create(createMenuDto);
    }
    findAll(query) {
        return this.menuService.findAll(query);
    }
    findOne(id) {
        return this.menuService.findOne(+id);
    }
    update(id, updateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }
    async remove(id) {
        if (await this.menuService.checkMenuChild(id)) {
            return ajaxResult_1.AjaxResult.error("有子菜单不可删除！");
        }
        return this.menuService.remove(+id);
    }
    async getUserRouters(req) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const jwtKey = await this.jwtService.verify(token);
        const list = await this.menuService.selectUserMenuTree(jwtKey.userId);
        return ajaxResult_1.AjaxResult.success(this.menuService.buildMenuRouter(list));
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)(),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_menu_add'),
    (0, log_decorator_1.Log)({ title: '新增菜单', operType: oper_log_enums_1.OperType.ADD }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_menu_edit'),
    (0, log_decorator_1.Log)({ title: '修改菜单', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_menu_delete'),
    (0, log_decorator_1.Log)({ title: '删除菜单', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('getRouters'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getUserRouters", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService,
        jwt_1.JwtService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map