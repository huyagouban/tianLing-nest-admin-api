import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/user.role.entity";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { RoleModule } from "../role/role.module";
import { MenuModule } from "../menu/menu.module";
@Module({
  imports: [
    forwardRef(() => MenuModule),
    forwardRef(() => RoleModule),
    TypeOrmModule.forFeature([User, UserRole]),
    // 临时存储文件
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, callback) => {
          const fileName = `${extname(file.originalname)+new Date().getTime()}`
          return callback(null, fileName)
        }
      })
    }),

  ],
  controllers: [UserController],
  providers: [UserService,],
  exports: [UserService]
})
export class UserModule { }
