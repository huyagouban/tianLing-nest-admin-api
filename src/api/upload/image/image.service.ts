import { Injectable } from '@nestjs/common';
import { AjaxResult } from 'src/common/ajaxResult';
import { UserService } from "src/api/system/user/user.service";
@Injectable()
export class UploadService {
  constructor(private userService: UserService) { }
  /**
   * 修改用户头像
   */
  async uploadAvatar(file: Express.Multer.File, userId: number): Promise<AjaxResult> {
    const avatarUrl = `/images/${file.filename}`;
    const updateAvatar = {
      userId: userId,
      avatar: avatarUrl
    }
    await this.userService.updateBasicInfo(updateAvatar)

    const data = {
      avatar: avatarUrl
    }
    return AjaxResult.success(data);
  }
  // 上传图片
  async uploadImage(file: Express.Multer.File): Promise<AjaxResult> {
    const fileUrl = `/images/${file.filename}`;
    const data = {
      fileUrl: fileUrl
    }
    return AjaxResult.success(data);
  }
}
