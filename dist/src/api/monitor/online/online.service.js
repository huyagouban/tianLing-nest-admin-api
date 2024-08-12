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
exports.OnlineService = void 0;
const common_1 = require("@nestjs/common");
const ajaxResult_1 = require("../../../common/ajaxResult");
const redis_service_1 = require("../../redis/redis.service");
const token_constants_1 = require("../../../common/constants/token.constants");
let OnlineService = class OnlineService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async onlineList(query) {
        const { loginIp = '', loginName = '' } = query;
        const keys = await this.redisService.keys(`${token_constants_1.TokenConstants.LOGIN_TOKEN_KEY}`);
        const promises = keys.map(async (key) => await this.redisService.parseToken(key));
        const loginUserList = await Promise.all(promises);
        const onlineUserList = loginUserList
            .filter((user) => {
            return user.loginIp.includes(loginIp) && user.userName.includes(loginName);
        })
            .map((user) => {
            return {
                userSk: user.userSk,
                userId: user.userId,
                loginName: user.userName,
                loginIp: user.loginIp,
                loginLocation: user.loginLocation,
                browser: user.browser,
                os: user.os,
                loginTime: user.iat,
            };
        }).sort((a, b) => b.loginTime - a.loginTime);
        const data = {
            currentPage: Number(query.currentPage),
            list: this.paginate(onlineUserList, query.currentPage, query.pageSize)[0],
            pageSize: Number(query.pageSize),
            total: Number(onlineUserList.length),
        };
        return ajaxResult_1.AjaxResult.success(data);
    }
    paginate(onlineUserList, currentPage, pageSize) {
        let pages = [];
        for (let i = 0; i < onlineUserList.length; i++) {
            pages.push(onlineUserList.slice((currentPage - 1) * pageSize, i + pageSize));
        }
        return pages;
    }
    async logout(userId) {
        await this.redisService.del(`${token_constants_1.TokenConstants.LOGIN_TOKEN_KEY}${userId}`);
        return ajaxResult_1.AjaxResult.success('强退成功');
    }
};
exports.OnlineService = OnlineService;
exports.OnlineService = OnlineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], OnlineService);
//# sourceMappingURL=online.service.js.map