import { Controller, Post, UploadedFile, UseInterceptors, Req, Request } from '@nestjs/common';
import { UploadService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AjaxResult } from 'src/common/ajaxResult';
import { ExtractJwt } from 'passport-jwt';
import { LoginService } from 'src/api/login/login.service';
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly loginService: LoginService
  ) { }
  /**
   * 上传头像
   * @param file 
   * @returns 
   */
  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('avatarfile'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request): Promise<AjaxResult> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const jwtKey = this.loginService.parseToken(token);
    return await this.uploadService.uploadAvatar(file, jwtKey.userId)
  }
  /**
   * 上传图片
   * @returns 
   */
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<AjaxResult> {
    return await this.uploadService.uploadImage(file)
  }
}
