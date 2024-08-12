/// <reference types="multer" />
import { AjaxResult } from 'src/common/ajaxResult';
import { UserService } from "src/api/system/user/user.service";
export declare class UploadService {
    private userService;
    constructor(userService: UserService);
    uploadAvatar(file: Express.Multer.File, userId: number): Promise<AjaxResult>;
    uploadImage(file: Express.Multer.File): Promise<AjaxResult>;
}
