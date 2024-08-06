import { Controller, Session, Get, Post, Body, Delete, Req, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { AjaxResult } from 'src/common/ajaxResult';
import { JwtServiceUtils } from "src/utils/service/jwtService.utils";
import { Public } from "src/utils/decorator/public.decorator";
import { RedisService } from 'src/api/redis/redis.service';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from "src/api/system/user/user.service";
@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private authService: JwtServiceUtils,
    private redisService: RedisService,
    private userService: UserService,

  ) { }

  /**
  * 
  * @returns 获取验证码
  */
  @Public()
  @Get('captcha')
  async getCaptchaImage(@Session() session): Promise<AjaxResult> {
    const captcha = await this.loginService.getCaptchaImage();
    session.code = captcha.text;
    return AjaxResult.success(captcha.data);
  }
  /**
  * 
  * @returns 登录提交
  */
  @Public()
  @Post('login')
  async login(@Session() session, @Body() body: CreateLoginDto,): Promise<AjaxResult> {
    // 将消息处理和日志记录提取到单独的函数中，以减少代码重复
    const handleLoginResponse = (message: string, success: boolean = false) => {
      if (!success) {
        this.loginService.loginLogError(body.userName, message);
        return AjaxResult.error(message);
      } else {
        this.loginService.loginLogSuccess(body.userName, message);
        return AjaxResult.success(data);
      }
    };

    // 检查会话代码是否存在及其正确性。
    if (!session.code || session.code.toLowerCase() !== body.code.toLowerCase()) {
      return handleLoginResponse('验证码错误或未获取');
    }

    // 尝试使用提供的凭据登录.
    const result = await this.loginService.login(body);
    if (!result) {
      return handleLoginResponse('用户名或密码错误');
    }

    // 成功登录后生成身份验证数据。
    const data = await this.authService.login(result);
    return handleLoginResponse('登录成功', true);
  }
  /**
   * 
   * @param req 
   * @returns 退出登录
   */
  @Delete('logout')
  async logout(@Req() req: Request | any): Promise<AjaxResult> {
    return AjaxResult.success(this.authService.logout(req.user))
  }
  /**
   * 
   * @param req 
   * @returns 获取用户登录信息
   */
  @Get('loginUserInfo')
  async loginUserInfo(@Req() req: Request): Promise<AjaxResult> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const jwtKey = this.loginService.parseToken(token);
    const data = await this.userService.loginUserInfo(jwtKey);
    return AjaxResult.success(data)
  }
}
