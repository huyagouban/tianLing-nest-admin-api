import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from "src/common/class/sys-login-user";
export declare class RedisService {
    private readonly cacheManager;
    private readonly jwtService;
    constructor(cacheManager: Cache, jwtService: JwtService);
    get<T>(key: string): Promise<T>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    keys(key: string): Promise<string[]>;
    parseToken(key: string): Promise<LoginUser>;
}
