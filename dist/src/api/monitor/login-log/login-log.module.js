"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLogModule = void 0;
const common_1 = require("@nestjs/common");
const login_log_service_1 = require("./login-log.service");
const login_log_controller_1 = require("./login-log.controller");
const typeorm_1 = require("@nestjs/typeorm");
const login_log_entity_1 = require("./entities/login-log.entity");
const login_module_1 = require("../../login/login.module");
let LoginLogModule = class LoginLogModule {
};
exports.LoginLogModule = LoginLogModule;
exports.LoginLogModule = LoginLogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => login_module_1.LoginModule),
            typeorm_1.TypeOrmModule.forFeature([login_log_entity_1.LoginLog])
        ],
        controllers: [login_log_controller_1.LoginLogController],
        providers: [login_log_service_1.LoginLogService],
        exports: [login_log_service_1.LoginLogService],
    })
], LoginLogModule);
//# sourceMappingURL=login-log.module.js.map