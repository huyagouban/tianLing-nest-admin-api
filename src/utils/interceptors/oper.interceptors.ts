import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { LogInterceptor } from 'src/utils/interceptors/log.interceptors'
import { OperLogService } from 'src/api/monitor/oper-log/oper-log.service'

/**
 * 操作日志记录拦截器
 */
@Injectable()
export class operLogInterceptor extends LogInterceptor {
    constructor(reflector: Reflector, operLogService: OperLogService) {
        super(reflector, operLogService)
    }
}