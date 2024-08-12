/// <reference types="multer" />
import { AjaxResult } from 'src/common/ajaxResult';
export declare class VideoService {
    uploadVideo(file: Express.Multer.File): Promise<AjaxResult>;
}
