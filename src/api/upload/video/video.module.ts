import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, basename } from "path";
@Module({
  imports: [
    // 临时存储文件
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/video',
        filename: (req, file, callback) => {
          const fileNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8')
          /** 先获取去掉后缀的文件名，然后获取时间戳，之后获取文件后缀，最后加起来组合一个新的文件名*/
          const ext = extname(fileNameUtf8)
          const fileName = `${basename(fileNameUtf8, ext) + new Date().getTime() + ext}`
          return callback(null, fileName)
        }
      })
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
