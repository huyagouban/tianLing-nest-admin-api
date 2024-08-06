import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AjaxResult } from 'src/common/ajaxResult';
@Controller('upload/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }
  /**
   * 上传视频
   * @param file 
   * @returns 
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File):Promise<AjaxResult> {
    return await this.videoService.uploadVideo(file);
  }

}
