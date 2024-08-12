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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const jwt_1 = require("@nestjs/jwt");
let RedisService = class RedisService {
    constructor(cacheManager, jwtService) {
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
    }
    async get(key) {
        return await this.cacheManager.get(key);
    }
    async set(key, value, ttl) {
        return await this.cacheManager.set(key, value, ttl);
    }
    async del(key) {
        return await this.cacheManager.del(key);
    }
    async keys(key) {
        const keys = await this.cacheManager.store.keys(`${key}*`);
        return keys;
    }
    async parseToken(key) {
        const token = await this.cacheManager.get(key);
        const jwtKey = this.jwtService.verify(token);
        return jwtKey;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], RedisService);
//# sourceMappingURL=redis.service.js.map