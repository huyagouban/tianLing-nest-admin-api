import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from "src/common/class/sys-login-user"
@Injectable()
export class RedisService {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly jwtService: JwtService
    ) { }

    /**获取 */
    async get<T>(key: string): Promise<T> {
        return await this.cacheManager.get(key);
    }
    /**存储 */
    async set(key: string, value: any, ttl?: number): Promise<void> {
        return await this.cacheManager.set(key, value, ttl);
    }
    /**删除 */
    async del(key: string): Promise<void> {
        return await this.cacheManager.del(key);
    }

    /**获取 redis所有的key*/
    async keys(key: string) {
        const keys = await this.cacheManager.store.keys(`${key}*`);
        return keys;
    }

    /**
  * 
  * @returns 获取token 解析jwt token令牌 
  */
    async parseToken(key: string): Promise<LoginUser> {
        const token: string = await this.cacheManager.get(key);
        const jwtKey = this.jwtService.verify(token);
        return jwtKey;
    }
}
