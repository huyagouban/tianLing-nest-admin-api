
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/api/system/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { RedisService } from 'src/api/redis/redis.service';
import { TokenConstants } from "src/common/constants/token.constants";
/**
 * 实现jwt策略
 * 对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,  // 注意点 ① 作用是将请求传递给下面的validate()函数
    ) {
        super({
            // 提供从请求中提取 JWT 的方法。
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 选择默认的 false 设置，它将确保 JWT 没有过期的责任委托给 Redis 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 Unauthorized 的响应。
            ignoreExpiration: false,
            // 密钥，不要暴露出去
            secretOrKey: configService.get('JWT_SECRET'),
            passReqToCallback: true,
        } as StrategyOptions);
    }


    async validate( req: Request,payload: User) {

        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        
        const existUser = await this.userRepository.findOne({
            where: { userId: payload.userId },
        });
        const cacheToken = await this.redisService.get(`${TokenConstants.LOGIN_TOKEN_KEY}${existUser.userId}`);

        if (!cacheToken) throw new UnauthorizedException('token已过期');

        if (token !== cacheToken) throw new UnauthorizedException('token不正确');

        if (!existUser) throw new UnauthorizedException('token验证失败');

        // 刷新了 Redis 中 JWT 的持续时间
        await this.redisService.set(
            `${TokenConstants.LOGIN_TOKEN_KEY}${existUser.userId}`,
            token,
            parseInt(this.configService.get('JWT_EXPIRES_IN'))     //注意这里，即 Redis 中这条数据的过期时间
        )
        return { userId: payload.userId, userName: payload.userName };
    }
}
