import { Injectable } from '@nestjs/common';
import { AjaxResult } from 'src/common/ajaxResult';
@Injectable()
export class VideoService {
  async uploadVideo(file: Express.Multer.File): Promise<AjaxResult> {
    const fileUrl = `/video/${file.filename}`;
    const data = {
      fileUrl: fileUrl
    }
    return AjaxResult.success(data);
  }

}
