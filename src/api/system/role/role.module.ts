import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from "./entities/role.entity";
import { RoleMenu } from "./entities/role.menu.entity";
import { UserRole } from "../user/entities/user.role.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleMenu,UserRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
