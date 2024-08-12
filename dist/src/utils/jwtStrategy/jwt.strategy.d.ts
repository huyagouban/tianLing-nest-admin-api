import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/api/system/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { RedisService } from 'src/api/redis/redis.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    private readonly configService;
    private readonly redisService;
    constructor(userRepository: Repository<User>, configService: ConfigService, redisService: RedisService);
    validate(req: Request, payload: User): Promise<{
        userId: number;
        userName: string;
    }>;
}
export {};
