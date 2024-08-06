import { Injectable, Session } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { AjaxResult } from 'src/common/ajaxResult';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Between, In } from 'typeorm';
import * as svgCaptcha from 'svg-captcha';
import { User } from "src/api/system/user/entities/user.entity";
import { PasswordUtils } from "src/utils/password/password.utils";
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { LoginLogService } from "src/api/monitor/login-log/login-log.service";
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
    private loginLogService: LoginLogService,
  ) { }
  /**
   * 
   * @returns 获取验证码
   */
  async getCaptchaImage(): Promise<any> {
    return svgCaptcha.createMathExpr({
      // 随机字符串大小
      size: 4,
      // 过滤掉一些字符，
      ignoreChars: '0o1i',
      // 噪声线数
      noise: 2,
      // 验证码的宽度
      width: 135,
      // 验证码高度
      height: 30,
      background: '#409eff'
    });
  }
  /**
* 
* @returns 登录提交
*/
  async login(body: CreateLoginDto): Promise<AjaxResult | any> {
    const { userName, password } = body;
    const user = await this.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.userName=:userName', { userName })
      .getOne();

    if (!user) return false
    const passwordBtn = await PasswordUtils.compare(password, user.password)
    if (!passwordBtn) {
      return false
    }
    return user
  }
  /**
   * 
   * @param token token字符串
   * @returns 解析jwt token令牌
   */
  parseToken(token: string): JwtToken {
    const jwtKey = this.jwtService.verify(token);
    return jwtKey;
  }
  /**
   * 登录失败日志
   * @param userName 用户名
   * @param errMsg 错误信息
   * @returns 登录失败
   */
  loginLogError(userName: string, errMsg: string) {
    this.loginLogService.fail(userName, errMsg);
  }
  /**
   * 登录成功日志
   * @param userName 用户名
   * @param success 登录信息
   * @returns 登录成功
   */
  loginLogSuccess(userName: string, success: string) {
    this.loginLogService.ok(userName, success)
  }
}
