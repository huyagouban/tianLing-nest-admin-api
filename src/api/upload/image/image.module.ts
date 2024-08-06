import { Module, forwardRef } from '@nestjs/common';
import { UploadService } from './image.service';
import { UploadController } from './image.controller';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, basename } from "path";
import { UserModule } from "src/api/system/user/user.module";
import { LoginModule } from "src/api/login/login.module"
@Module({
  imports: [
    // 临时存储文件
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const fileNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8')
          /** 先获取去掉后缀的文件名，然后获取时间戳，之后获取文件后缀，最后加起来组合一个新的文件名*/
          const ext = extname(fileNameUtf8)
          const fileName = `${basename(fileNameUtf8, ext) + new Date().getTime() + ext}`
          return callback(null, fileName)
        }
      })
    }),
    forwardRef(() => UserModule),
    forwardRef(() => LoginModule),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class ImageModule { }
