import { Module,forwardRef } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogController } from './login-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoginLog } from "src/api/monitor/login-log/entities/login-log.entity";
import { LoginModule } from "src/api/login/login.module";

@Module({
  imports: [
    forwardRef(() => LoginModule),
    TypeOrmModule.forFeature([LoginLog])
  ],
  controllers: [LoginLogController],
  providers: [LoginLogService],
  exports: [LoginLogService],
})
export class LoginLogModule { }
