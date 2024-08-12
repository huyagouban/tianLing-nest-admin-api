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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_dto_1 = require("./dto/role.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async add(role) {
        if (!await this.roleService.checkRoleNameUnique(role)) {
            return ajaxResult_1.AjaxResult.error(`新增角色${role.roleName}失败，角色名称已存在`);
        }
        if (!(await this.roleService.checkRoleCodeUnique(role))) {
            return ajaxResult_1.AjaxResult.error(`新增角色${role.roleName}失败，角色权限已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.roleService.add(role));
    }
    findAll(query) {
        return this.roleService.findAll(query);
    }
    async findOne(id) {
        return ajaxResult_1.AjaxResult.success(await this.roleService.findOne(+id));
    }
    async update(id, updateRole) {
        if (!await this.roleService.checkRoleNameUnique(updateRole)) {
            return ajaxResult_1.AjaxResult.error(`修改角色${updateRole.roleName}失败，角色名称已存在`);
        }
        if (!(await this.roleService.checkRoleCodeUnique(updateRole))) {
            return ajaxResult_1.AjaxResult.error(`修改角色${updateRole.roleName}失败，角色权限已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.roleService.update(id, updateRole));
    }
    async delete(id) {
        return ajaxResult_1.AjaxResult.success(await this.roleService.remove(id));
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.roleIds.split(',').map(Number);
            return await this.roleService.downloadExcel(ids);
        }
        catch (error) {
            return ajaxResult_1.AjaxResult.error(error.message);
        }
    }
    async selectRole(query) {
        return this.roleService.selectRole(query);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Post)('add'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_role_add'),
    (0, log_decorator_1.Log)({ title: '新增角色', operType: oper_log_enums_1.OperType.ADD }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.ListRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_role_edit'),
    (0, log_decorator_1.Log)({ title: '修改角色', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_role_delete'),
    (0, log_decorator_1.Log)({ title: '删除角色', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_role_export'),
    (0, log_decorator_1.Log)({ title: '导出角色', operType: oper_log_enums_1.OperType.EXPORT }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, role_dto_1.ListRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "downloadExcel", null);
__decorate([
    (0, common_1.Get)('selectRole'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.ListRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "selectRole", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map