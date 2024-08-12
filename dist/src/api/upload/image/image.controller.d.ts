/// <reference types="multer" />
import { UploadService } from './image.service';
import { AjaxResult } from 'src/common/ajaxResult';
import { LoginService } from 'src/api/login/login.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly loginService;
    constructor(uploadService: UploadService, loginService: LoginService);
    uploadAvatar(file: Express.Multer.File, req: Request): Promise<AjaxResult>;
    uploadImage(file: Express.Multer.File): Promise<AjaxResult>;
}
