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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const create_login_dto_1 = require("./dto/create-login.dto");
const ajaxResult_1 = require("../../common/ajaxResult");
const jwtService_utils_1 = require("../../utils/service/jwtService.utils");
const public_decorator_1 = require("../../utils/decorator/public.decorator");
const redis_service_1 = require("../redis/redis.service");
const passport_jwt_1 = require("passport-jwt");
const user_service_1 = require("../system/user/user.service");
let LoginController = class LoginController {
    constructor(loginService, authService, redisService, userService) {
        this.loginService = loginService;
        this.authService = authService;
        this.redisService = redisService;
        this.userService = userService;
    }
    async getCaptchaImage(session) {
        const captcha = await this.loginService.getCaptchaImage();
        session.code = captcha.text;
        return ajaxResult_1.AjaxResult.success(captcha.data);
    }
    async login(session, body) {
        const handleLoginResponse = (message, success = false) => {
            if (!success) {
                this.loginService.loginLogError(body.userName, message);
                return ajaxResult_1.AjaxResult.error(message);
            }
            else {
                this.loginService.loginLogSuccess(body.userName, message);
                return ajaxResult_1.AjaxResult.success(data);
            }
        };
        if (!session.code || session.code.toLowerCase() !== body.code.toLowerCase()) {
            return handleLoginResponse('验证码错误或未获取');
        }
        const result = await this.loginService.login(body);
        if (!result) {
            return handleLoginResponse('用户名或密码错误');
        }
        const data = await this.authService.login(result);
        return handleLoginResponse('登录成功', true);
    }
    async logout(req) {
        return ajaxResult_1.AjaxResult.success(this.authService.logout(req.user));
    }
    async loginUserInfo(req) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const jwtKey = this.loginService.parseToken(token);
        const data = await this.userService.loginUserInfo(jwtKey);
        return ajaxResult_1.AjaxResult.success(data);
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('captcha'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getCaptchaImage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_login_dto_1.CreateLoginDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('loginUserInfo'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUserInfo", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        jwtService_utils_1.JwtServiceUtils,
        redis_service_1.RedisService,
        user_service_1.UserService])
], LoginController);
//# sourceMappingURL=login.controller.js.map