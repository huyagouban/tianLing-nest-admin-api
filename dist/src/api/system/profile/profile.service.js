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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const role_service_1 = require("../role/role.service");
const identity_utils_1 = require("../../../utils/security/identity.utils");
const user_constants_1 = require("../../../common/constants/user.constants");
const ajaxResult_1 = require("../../../common/ajaxResult");
const password_utils_1 = require("../../../utils/password/password.utils");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProfileService = class ProfileService {
    constructor(userRepository, userService, roleService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    async profile(userId) {
        const userInfo = await this.userService.selectUserByUserId(userId);
        userInfo.roles = await this.getProfileRoles(userId);
        return userInfo;
    }
    async updateUserInfo(user) {
        const { roles, ...userInfo } = user;
        return ajaxResult_1.AjaxResult.success(await this.userService.updateBasicInfo(userInfo));
    }
    async getProfileRoles(userId) {
        if (identity_utils_1.IdentityUtils.isAdminUser(userId)) {
            return await this.roleService.selectRoleByUserIdByProfile(user_constants_1.UserConstants.SUPER_ROLE);
        }
        else {
            const roles = await this.roleService.selectRoleByUserId(userId);
            return roles;
        }
    }
    async updatePassword(userInfo) {
        const { userName, password } = userInfo;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.userName=:userName', { userName })
            .getOne();
        if (!await password_utils_1.PasswordUtils.compare(userInfo.oldPassword, user.password)) {
            return ajaxResult_1.AjaxResult.error('旧密码错误');
        }
        if (await password_utils_1.PasswordUtils.compare(userInfo.newPassword, user.password)) {
            return ajaxResult_1.AjaxResult.error('新密码不能与旧密码相同');
        }
        const newPassword = await password_utils_1.PasswordUtils.create(userInfo.newPassword);
        return ajaxResult_1.AjaxResult.success(await this.userService.updateBasicInfo({
            userId: user.userId,
            password: newPassword
        }));
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        role_service_1.RoleService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map