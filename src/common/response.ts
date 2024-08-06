import { Injectable, NestInterceptor, CallHandler, HttpStatus } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { AjaxResult } from "./ajaxResult";



@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<AjaxResult<T>> {
        return next.handle().pipe(map(dataOf => {
            if (dataOf) {
                // 设置统一的成功状态码    
                const data = dataOf.data;
                const message = dataOf.message;
                const success = dataOf.success;
                const status = dataOf.status=='1'?200:dataOf.status;
                // 设置响应体
                return AjaxResult.success(data, message, success, status)
            }

        }))
    }
}