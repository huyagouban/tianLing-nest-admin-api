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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const svgCaptcha = require("svg-captcha");
const user_entity_1 = require("../system/user/entities/user.entity");
const password_utils_1 = require("../../utils/password/password.utils");
const jwt_1 = require("@nestjs/jwt");
const login_log_service_1 = require("../monitor/login-log/login-log.service");
let LoginService = class LoginService {
    constructor(user, jwtService, loginLogService) {
        this.user = user;
        this.jwtService = jwtService;
        this.loginLogService = loginLogService;
    }
    async getCaptchaImage() {
        return svgCaptcha.createMathExpr({
            size: 4,
            ignoreChars: '0o1i',
            noise: 2,
            width: 135,
            height: 30,
            background: '#409eff'
        });
    }
    async login(body) {
        const { userName, password } = body;
        const user = await this.user
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.userName=:userName', { userName })
            .getOne();
        if (!user)
            return false;
        const passwordBtn = await password_utils_1.PasswordUtils.compare(password, user.password);
        if (!passwordBtn) {
            return false;
        }
        return user;
    }
    parseToken(token) {
        const jwtKey = this.jwtService.verify(token);
        return jwtKey;
    }
    loginLogError(userName, errMsg) {
        this.loginLogService.fail(userName, errMsg);
    }
    loginLogSuccess(userName, success) {
        this.loginLogService.ok(userName, success);
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        login_log_service_1.LoginLogService])
], LoginService);
//# sourceMappingURL=login.service.js.map