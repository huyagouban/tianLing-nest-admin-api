"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const core_1 = require("@nestjs/core");
const ajaxResult_1 = require("../../common/ajaxResult");
const oper_log_service_1 = require("../../api/monitor/oper-log/oper-log.service");
const logger_constants_1 = require("../../common/constants/logger.constants");
const oper_log_entity_1 = require("../../api/monitor/oper-log/entities/oper-log.entity");
const ip_utils_1 = require("../ip/ip.utils");
const security_constants_1 = require("../../common/constants/security.constants");
const base_status_enums_1 = require("../../common/public/base-status.enums");
let LogInterceptor = class LogInterceptor {
    constructor(reflector, operLogService) {
        this.reflector = reflector;
        this.operLogService = operLogService;
    }
    intercept(context, next) {
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(res => {
            const executionTime = Date.now() - now;
            this.saveOperLog(context, res, executionTime);
        }), (0, rxjs_1.catchError)((err) => {
            const executionTime = Date.now() - now;
            this.saveOperLog(context, ajaxResult_1.AjaxResult.error(err.message), executionTime);
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
    saveOperLog(context, result, executionTime) {
        const meta = this.reflector.get(logger_constants_1.LOGGER_LOG_METADATA, context.getHandler());
        if (!meta)
            return;
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const operLog = new oper_log_entity_1.OperLog();
        const isStreamableFile = result instanceof common_1.StreamableFile;
        operLog.title = meta.title;
        operLog.operType = meta.operType;
        operLog.operMethod = `${context.getClass().name}.${context.getHandler().name}()`;
        const region = ip_utils_1.IpUtils.ip2Region(ip_utils_1.IpUtils.requestIp(request));
        operLog.operIp = ip_utils_1.IpUtils.requestIp(request);
        operLog.operLocation = `${region.country} ${region.province} ${region.city}`;
        operLog.operName = request[security_constants_1.SecurityConstants.USER][security_constants_1.SecurityConstants.USER_NAME];
        operLog.requestUrl = request.url;
        operLog.requestMethod = request.method;
        if (meta.isSaveRequestData) {
            operLog.requestParam = JSON.stringify(request.body).slice(0, 2000);
        }
        if (meta.isSaveResponseData && !isStreamableFile) {
            operLog.requestResult = JSON.stringify(result).slice(0, 2000);
        }
        if (isStreamableFile || result.status === common_1.HttpStatus.OK) {
            operLog.operStatus = base_status_enums_1.BaseStatusEnums.NORMAL;
            operLog.requestErrmsg = undefined;
        }
        else {
            operLog.operStatus = base_status_enums_1.BaseStatusEnums.ABNORMAL;
            operLog.requestErrmsg = result.message;
        }
        operLog.costTime = executionTime + '毫秒';
        this.operLogService.addOperLog(operLog);
    }
};
exports.LogInterceptor = LogInterceptor;
exports.LogInterceptor = LogInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        oper_log_service_1.OperLogService])
], LogInterceptor);
//# sourceMappingURL=log.interceptors.js.map