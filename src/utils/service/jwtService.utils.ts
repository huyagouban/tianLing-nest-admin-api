import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/api/system/user/entities/user.entity';
import { RedisService } from 'src/api/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto'
import { IpUtils } from "src/utils/ip/ip.utils";
import { RequestContext } from "src/utils/context/request.context";
import { UAParser } from 'ua-parser-js'
import { TokenConstants } from "src/common/constants/token.constants";
@Injectable()
export class JwtServiceUtils {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly configService: ConfigService,
    private requestContext: RequestContext,
  ) { }

  /**
   * 
   * @param user 用户对象
   * @returns 设置token并存到redis中，设置时间
   */
  async login(user: Partial<User>) {
    const request: any = this.requestContext.getRequest();
    const region = IpUtils.ip2Region(IpUtils.requestIp(request))
    const parser = new UAParser(request.headers['user-agent']);
    const payload = {
      userName: user.userName,
      userId: user.userId,
      userSk: randomUUID(),
      loginIp: IpUtils.requestIp(request),
      loginLocation: `${region.country}${region.province}${region.city}`,
      userAgent: request.headers['user-agent'],
      browser: `${parser.getBrowser().name}/${parser.getBrowser().version}`,
      os: `${parser.getOS().name}/${parser.getOS().version}`,
    };
    const access_token = this.jwtService.sign(payload);

    // 签发 JWT 时存入 Redis 中，并设置过期时间
    await this.redisService.set(
      `${TokenConstants.LOGIN_TOKEN_KEY}${user.userId}`,
      access_token,
      parseInt(this.configService.get('JWT_EXPIRES_IN'))     //注意这里，即 Redis 中这条数据的过期时间
    )
    return {
      access_token,
      type: 'Bearer',
    };
  }
  /**
   * 
   * @param user 用户对象
   * @returns 退出登录 将token从redis中删除
   */
  async logout(user: Partial<User>) {
    await this.redisService.del(`${TokenConstants.LOGIN_TOKEN_KEY}${user.userId}`);
  }
}