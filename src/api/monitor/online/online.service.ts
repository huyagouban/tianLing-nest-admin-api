import { Injectable } from '@nestjs/common';
import { ListOnlineDto } from './dto/online.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { RedisService } from "src/api/redis/redis.service";
import { LoginUser } from "src/common/class/sys-login-user"
import { OnlineInfoVo } from "src/api/monitor/online/vo/online.vo";
import { TokenConstants } from "src/common/constants/token.constants";
@Injectable()
export class OnlineService {
  constructor(
    private readonly redisService: RedisService
  ) { }
  /**
   * 在线用户列表
   * @param query
   * @param token
   * @returns
   */
  async onlineList(query: ListOnlineDto): Promise<AjaxResult> {
    const { loginIp = '', loginName = '' } = query
    const keys = await this.redisService.keys(`${TokenConstants.LOGIN_TOKEN_KEY}`);
    const promises = keys.map(async (key) => await this.redisService.parseToken(key))
    const loginUserList: LoginUser[] = await Promise.all(promises)
    const onlineUserList: OnlineInfoVo[] = loginUserList
      .filter((user) => {
        return user.loginIp.includes(loginIp) && user.userName.includes(loginName)
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
        }
      }).sort((a, b) => b.loginTime - a.loginTime)
    const data = {
      currentPage: Number(query.currentPage),
      list: this.paginate(onlineUserList, query.currentPage, query.pageSize)[0],
      pageSize: Number(query.pageSize),
      total: Number(onlineUserList.length),
    }
    return AjaxResult.success(data);
  }
  /**
   * 假分页
   * @param onlineUserList
   * @param currentPage
   * @param pageSize
   * @returns
   */
  paginate(onlineUserList: OnlineInfoVo[], currentPage: number, pageSize: number): OnlineInfoVo[] {
    let pages = [];
    for (let i = 0; i < onlineUserList.length; i++) {
      pages.push(onlineUserList.slice((currentPage - 1) * pageSize, i + pageSize));
    }
    return pages;
  }
  /**
   * 强退
   * @param userId
   * @returns
   */
  async logout(userId: number): Promise<AjaxResult> {
    await this.redisService.del(`${TokenConstants.LOGIN_TOKEN_KEY}${userId}`)
    return AjaxResult.success('强退成功')
  }
}
