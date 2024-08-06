import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { RoleModule } from "src/api/system/role/role.module";
import { UserModule } from "src/api/system/user/user.module";
import { LoginModule } from "src/api/login/login.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {  User} from "../user/entities/user.entity";
@Module({
  imports: [
    forwardRef(() => RoleModule),
    forwardRef(() => UserModule),
    forwardRef(() => LoginModule),
    TypeOrmModule.forFeature([User,]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule { }
