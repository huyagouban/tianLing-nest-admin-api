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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const list_user_dto_1 = require("./dto/list-user.dto");
const ajaxResult_1 = require("../../../common/ajaxResult");
const require_permissions_decorator_1 = require("../../../utils/decorator/require-permissions.decorator");
const logical_constant_1 = require("../../../common/constants/logical.constant");
const log_decorator_1 = require("../../../utils/decorator/log.decorator");
const oper_log_enums_1 = require("../../../common/class/oper-log-enums");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        if (!await this.userService.checkUserNameUnique(createUserDto)) {
            return ajaxResult_1.AjaxResult.error(`新增用户${createUserDto.userName}失败，用户名称已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.userService.create(createUserDto), '新增成功', true);
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    findOne(userId) {
        return this.userService.findOne(+userId);
    }
    async update(userId, updateUserDto) {
        if (!await this.userService.checkUserNameUnique(updateUserDto)) {
            return ajaxResult_1.AjaxResult.error(`修改用户${updateUserDto.userName}失败，用户名称已存在`);
        }
        return ajaxResult_1.AjaxResult.success(await this.userService.update(userId, updateUserDto), '修改成功', true);
    }
    remove(id) {
        return this.userService.remove(id);
    }
    async downloadExcel(response, query) {
        try {
            let ids = query.userIds.split(',').map(Number);
            return await this.userService.downloadExcel(ids);
        }
        catch (error) {
            console.log(error, 'error+++++++++');
        }
    }
    async downloadExcelTemlate() {
        return await this.userService.downloadExcelTemlate();
    }
    async importExcel(file) {
        return await this.userService.importExcel(file);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_user_add'),
    (0, log_decorator_1.Log)({ title: '新增用户', operType: oper_log_enums_1.OperType.ADD }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_user_dto_1.ListUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)(['sys_user_edit', 'sys_user_resetPwd'], logical_constant_1.Logical.OR),
    (0, log_decorator_1.Log)({ title: '修改用户', operType: oper_log_enums_1.OperType.UPDATE }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_user_delete'),
    (0, log_decorator_1.Log)({ title: '删除用户', operType: oper_log_enums_1.OperType.DELETE }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('excel/download'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_user_export'),
    (0, log_decorator_1.Log)({ title: '导出用户', operType: oper_log_enums_1.OperType.EXPORT }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_user_dto_1.ListUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "downloadExcel", null);
__decorate([
    (0, common_1.Get)('excel/temlate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "downloadExcelTemlate", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, require_permissions_decorator_1.RequirePermissions)('sys_user_import'),
    (0, log_decorator_1.Log)({ title: '导入用户', operType: oper_log_enums_1.OperType.IMPORT }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "importExcel", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map