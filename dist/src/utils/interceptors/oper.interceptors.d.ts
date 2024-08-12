import { Reflector } from '@nestjs/core';
import { LogInterceptor } from 'src/utils/interceptors/log.interceptors';
import { OperLogService } from 'src/api/monitor/oper-log/oper-log.service';
export declare class operLogInterceptor extends LogInterceptor {
    constructor(reflector: Reflector, operLogService: OperLogService);
}
