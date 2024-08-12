"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const profile_controller_1 = require("./profile.controller");
const role_module_1 = require("../role/role.module");
const user_module_1 = require("../user/user.module");
const login_module_1 = require("../../login/login.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => login_module_1.LoginModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User,]),
        ],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
        exports: [profile_service_1.ProfileService],
    })
], ProfileModule);
//# sourceMappingURL=profile.module.js.map