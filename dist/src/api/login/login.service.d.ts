import { CreateLoginDto } from './dto/create-login.dto';
import { AjaxResult } from 'src/common/ajaxResult';
import { Repository } from 'typeorm';
import { User } from "src/api/system/user/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { LoginLogService } from "src/api/monitor/login-log/login-log.service";
export declare class LoginService {
    private readonly user;
    private jwtService;
    private loginLogService;
    constructor(user: Repository<User>, jwtService: JwtService, loginLogService: LoginLogService);
    getCaptchaImage(): Promise<any>;
    login(body: CreateLoginDto): Promise<AjaxResult | any>;
    parseToken(token: string): JwtToken;
    loginLogError(userName: string, errMsg: string): void;
    loginLogSuccess(userName: string, success: string): void;
}
