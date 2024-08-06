import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, StreamableFile } from '@nestjs/common'
import { Observable, tap, catchError, throwError } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { AjaxResult } from "src/common/ajaxResult";
import { OperLogService } from "src/api/monitor/oper-log/oper-log.service"
import { LOGGER_LOG_METADATA } from "src/common/constants/logger.constants";
import { LogOptions } from "src/utils/decorator/log.decorator";
import { OperLog } from "src/api/monitor/oper-log/entities/oper-log.entity";
import { IpUtils } from "src/utils/ip/ip.utils";
import { SecurityConstants } from "src/common/constants/security.constants";
import { BaseStatusEnums } from "src/common/public/base-status.enums";
/**
 * 自定义操作日志拦截器
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly operLogService: OperLogService
    ) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(
            tap(res => {
                const executionTime = Date.now() - now;
                this.saveOperLog(context, res, executionTime)
            }),
            catchError((err: Error) => {
                const executionTime = Date.now() - now;
                this.saveOperLog(context, AjaxResult.error(err.message), executionTime)
                return throwError(() => err)
            })
        )
    }
    /**
    * 保存操作日志
   * @param context ExecutionContext
   * @param result AjaxResult | StreamableFile
   * @param executionTime 请求耗时
   * @returns
     */
    private saveOperLog(context: ExecutionContext, result: AjaxResult | StreamableFile, executionTime: number) {
        const meta = this.reflector.get<LogOptions>(LOGGER_LOG_METADATA, context.getHandler())
        if (!meta) return

        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()
        const operLog = new OperLog()
        const isStreamableFile = result instanceof StreamableFile

        operLog.title = meta.title
        operLog.operType = meta.operType
        operLog.operMethod = `${context.getClass().name}.${context.getHandler().name}()`

        const region = IpUtils.ip2Region(IpUtils.requestIp(request))
        operLog.operIp = IpUtils.requestIp(request)
        operLog.operLocation = `${region.country} ${region.province} ${region.city}`
        operLog.operName = request[SecurityConstants.USER][SecurityConstants.USER_NAME]

        operLog.requestUrl = request.url
        operLog.requestMethod = request.method

        if (meta.isSaveRequestData) {
            operLog.requestParam = JSON.stringify(request.body).slice(0, 2000)
        }
        if (meta.isSaveResponseData && !isStreamableFile) {
            operLog.requestResult = JSON.stringify(result).slice(0, 2000)
        }
        if (isStreamableFile || result.status === HttpStatus.OK) {
            operLog.operStatus = BaseStatusEnums.NORMAL
            operLog.requestErrmsg = undefined
        } else {
            operLog.operStatus = BaseStatusEnums.ABNORMAL
            operLog.requestErrmsg = result.message
        }
        operLog.costTime = executionTime+'毫秒'
        this.operLogService.addOperLog(operLog)
    }
}