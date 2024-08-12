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
exports.JwtServiceUtils = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../../api/redis/redis.service");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const ip_utils_1 = require("../ip/ip.utils");
const request_context_1 = require("../context/request.context");
const ua_parser_js_1 = require("ua-parser-js");
const token_constants_1 = require("../../common/constants/token.constants");
let JwtServiceUtils = class JwtServiceUtils {
    constructor(jwtService, redisService, configService, requestContext) {
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.configService = configService;
        this.requestContext = requestContext;
    }
    async login(user) {
        const request = this.requestContext.getRequest();
        const region = ip_utils_1.IpUtils.ip2Region(ip_utils_1.IpUtils.requestIp(request));
        const parser = new ua_parser_js_1.UAParser(request.headers['user-agent']);
        const payload = {
            userName: user.userName,
            userId: user.userId,
            userSk: (0, crypto_1.randomUUID)(),
            loginIp: ip_utils_1.IpUtils.requestIp(request),
            loginLocation: `${region.country}${region.province}${region.city}`,
            userAgent: request.headers['user-agent'],
            browser: `${parser.getBrowser().name}/${parser.getBrowser().version}`,
            os: `${parser.getOS().name}/${parser.getOS().version}`,
        };
        const access_token = this.jwtService.sign(payload);
        await this.redisService.set(`${token_constants_1.TokenConstants.LOGIN_TOKEN_KEY}${user.userId}`, access_token, parseInt(this.configService.get('JWT_EXPIRES_IN')));
        return {
            access_token,
            type: 'Bearer',
        };
    }
    async logout(user) {
        await this.redisService.del(`${token_constants_1.TokenConstants.LOGIN_TOKEN_KEY}${user.userId}`);
    }
};
exports.JwtServiceUtils = JwtServiceUtils;
exports.JwtServiceUtils = JwtServiceUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        redis_service_1.RedisService,
        config_1.ConfigService,
        request_context_1.RequestContext])
], JwtServiceUtils);
//# sourceMappingURL=jwtService.utils.js.map