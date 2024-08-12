import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { OperLogService } from "src/api/monitor/oper-log/oper-log.service";
export declare class LogInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly operLogService;
    constructor(reflector: Reflector, operLogService: OperLogService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private saveOperLog;
}
