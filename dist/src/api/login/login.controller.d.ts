import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { AjaxResult } from 'src/common/ajaxResult';
import { JwtServiceUtils } from "src/utils/service/jwtService.utils";
import { RedisService } from 'src/api/redis/redis.service';
import { UserService } from "src/api/system/user/user.service";
export declare class LoginController {
    private readonly loginService;
    private authService;
    private redisService;
    private userService;
    constructor(loginService: LoginService, authService: JwtServiceUtils, redisService: RedisService, userService: UserService);
    getCaptchaImage(session: any): Promise<AjaxResult>;
    login(session: any, body: CreateLoginDto): Promise<AjaxResult>;
    logout(req: Request | any): Promise<AjaxResult>;
    loginUserInfo(req: Request): Promise<AjaxResult>;
}
