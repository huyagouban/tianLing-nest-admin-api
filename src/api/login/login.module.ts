import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from "src/api/system/user/entities/user.entity";
import { UserRole } from "src/api/system/user/entities/user.role.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceUtils } from "src/utils/service/jwtService.utils";
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "src/utils/jwtStrategy/jwt.strategy";
import { UserService } from "src/api/system/user/user.service";
import { RoleModule } from "src/api/system/role/role.module";
import { MenuModule } from "src/api/system/menu/menu.module";
import { NestGlobalContext } from "src/utils/context/globalContext";
import { ClsModule } from 'nestjs-cls'
import { AuthServiceUtils } from "src/utils/service/authSerice.utils";
import { LoginLogModule } from "src/api/monitor/login-log/login-log.module";
const jwtModule = JwtModule.register({
  secret: 'tianLingJwtService',
  // signOptions: { expiresIn: '4h' },// 设置token过期时间，单位：120ms/60s/4h/7d
});
@Module({
  imports: [
    forwardRef(() => PassportModule),
    forwardRef(() => RoleModule),
    forwardRef(() => MenuModule),
    forwardRef(() => LoginLogModule),
    jwtModule,
    TypeOrmModule.forFeature([User, UserRole]),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        saveReq: true,
        saveRes: true,
        generateId: true,
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtServiceUtils, JwtStrategy, UserService,AuthServiceUtils,...NestGlobalContext],
  exports: [jwtModule, LoginService,AuthServiceUtils,...NestGlobalContext],
})
export class LoginModule { }
