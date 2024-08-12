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
exports.AuthServiceUtils = void 0;
const common_1 = require("@nestjs/common");
const logical_constant_1 = require("../../common/constants/logical.constant");
const user_constants_1 = require("../../common/constants/user.constants");
const ajaxResult_1 = require("../../common/ajaxResult");
const security_context_1 = require("../context/security.context");
const login_service_1 = require("../../api/login/login.service");
const user_service_1 = require("../../api/system/user/user.service");
let AuthServiceUtils = class AuthServiceUtils {
    constructor(securityContext, loginService, userService) {
        this.securityContext = securityContext;
        this.loginService = loginService;
        this.userService = userService;
    }
    checkLogin() {
        this.getLoginUser();
    }
    async getLoginUser() {
        const token = this.securityContext.getToken();
        if (!token) {
            throw ajaxResult_1.AjaxResult.error("token不能为空");
        }
        const jwtKey = this.loginService.parseToken(token);
        const loginUser = await this.userService.loginUserInfo(jwtKey);
        if (!loginUser) {
            throw ajaxResult_1.AjaxResult.error("token已过期或验证不正确！", 401);
        }
        return loginUser;
    }
    async getPermissionList() {
        try {
            const loginUser = await this.getLoginUser();
            return loginUser.permissions;
        }
        catch (error) {
            return [];
        }
    }
    inPermission(permissions, permission) {
        return permissions.includes(user_constants_1.UserConstants.SUPER_ROLE_PERMISSION) || permissions.includes(permission);
    }
    async hasPermission(permission) {
        return this.inPermission(await this.getPermissionList(), permission);
    }
    async checkPermissioniLogical(requirePermissions) {
        if (requirePermissions.logical === logical_constant_1.Logical.AND) {
            await this.checkPermissioniLogicalAnd(requirePermissions.value);
        }
        else {
            await this.checkPermissioniLogicalOr(requirePermissions.value);
        }
    }
    async checkPermissioniLogicalAnd(permissions) {
        for (const permission of permissions) {
            if (!await this.hasPermission(permission)) {
                throw ajaxResult_1.AjaxResult.error("没有权限访问该资源", 403);
            }
        }
    }
    async checkPermissioniLogicalOr(permissions) {
        for (const permission of permissions) {
            if (await this.hasPermission(permission)) {
                return;
            }
        }
        if (permissions.length > 0) {
            throw ajaxResult_1.AjaxResult.error("没有权限访问该资源", 403);
        }
    }
};
exports.AuthServiceUtils = AuthServiceUtils;
exports.AuthServiceUtils = AuthServiceUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [security_context_1.SecurityContext,
        login_service_1.LoginService,
        user_service_1.UserService])
], AuthServiceUtils);
//# sourceMappingURL=authSerice.utils.js.map