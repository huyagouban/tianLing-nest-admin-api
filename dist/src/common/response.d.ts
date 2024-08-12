import { NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AjaxResult } from "./ajaxResult";
export declare class Response<T = any> implements NestInterceptor {
    intercept(context: any, next: CallHandler): Observable<AjaxResult<T>>;
}
