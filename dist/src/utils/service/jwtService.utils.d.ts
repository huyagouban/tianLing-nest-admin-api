import { JwtService } from '@nestjs/jwt';
import { User } from 'src/api/system/user/entities/user.entity';
import { RedisService } from 'src/api/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { RequestContext } from "src/utils/context/request.context";
export declare class JwtServiceUtils {
    private jwtService;
    private redisService;
    private readonly configService;
    private requestContext;
    constructor(jwtService: JwtService, redisService: RedisService, configService: ConfigService, requestContext: RequestContext);
    login(user: Partial<User>): Promise<{
        access_token: string;
        type: string;
    }>;
    logout(user: Partial<User>): Promise<void>;
}
