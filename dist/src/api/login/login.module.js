"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const login_controller_1 = require("./login.controller");
const user_entity_1 = require("../system/user/entities/user.entity");
const user_role_entity_1 = require("../system/user/entities/user.role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwtService_utils_1 = require("../../utils/service/jwtService.utils");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../../utils/jwtStrategy/jwt.strategy");
const user_service_1 = require("../system/user/user.service");
const role_module_1 = require("../system/role/role.module");
const menu_module_1 = require("../system/menu/menu.module");
const globalContext_1 = require("../../utils/context/globalContext");
const nestjs_cls_1 = require("nestjs-cls");
const authSerice_utils_1 = require("../../utils/service/authSerice.utils");
const login_log_module_1 = require("../monitor/login-log/login-log.module");
const jwtModule = jwt_1.JwtModule.register({
    secret: 'tianLingJwtService',
});
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => passport_1.PassportModule),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            (0, common_1.forwardRef)(() => menu_module_1.MenuModule),
            (0, common_1.forwardRef)(() => login_log_module_1.LoginLogModule),
            jwtModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_role_entity_1.UserRole]),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    saveReq: true,
                    saveRes: true,
                    generateId: true,
                },
            }),
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService, jwtService_utils_1.JwtServiceUtils, jwt_strategy_1.JwtStrategy, user_service_1.UserService, authSerice_utils_1.AuthServiceUtils, ...globalContext_1.NestGlobalContext],
        exports: [jwtModule, login_service_1.LoginService, authSerice_utils_1.AuthServiceUtils, ...globalContext_1.NestGlobalContext],
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map