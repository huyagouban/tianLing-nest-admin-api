/// <reference types="multer" />
import { VideoService } from './video.service';
import { AjaxResult } from 'src/common/ajaxResult';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    uploadVideo(file: Express.Multer.File): Promise<AjaxResult>;
}
