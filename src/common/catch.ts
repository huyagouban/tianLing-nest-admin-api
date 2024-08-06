
/**
 *  定义捕获所有异常（Exception）和 错误（Error）
 *  的全局异常/错误过滤器，需在 app.module.ts 中注册该过滤器
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import { AjaxResult } from "./ajaxResult";

@Catch()
export class HttpFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const code =  exception?.status
        const statusCode = exception instanceof HttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;              
        const resContents=AjaxResult.error(exception?.message,code?code:statusCode)
        // 使用不特定于平台（express 或 fastify）的方式（httpAdapter）返回响应内容
        httpAdapter.reply(response, resContents, statusCode);
    }
}
