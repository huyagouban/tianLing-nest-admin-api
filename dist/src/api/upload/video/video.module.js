"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const video_controller_1 = require("./video.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/video',
                    filename: (req, file, callback) => {
                        const fileNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8');
                        const ext = (0, path_1.extname)(fileNameUtf8);
                        const fileName = `${(0, path_1.basename)(fileNameUtf8, ext) + new Date().getTime() + ext}`;
                        return callback(null, fileName);
                    }
                })
            }),
        ],
        controllers: [video_controller_1.VideoController],
        providers: [video_service_1.VideoService],
        exports: [video_service_1.VideoService],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map