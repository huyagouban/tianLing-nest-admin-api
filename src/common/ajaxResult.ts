import { HttpStatus } from '@nestjs/common'

/**
 * 响应对象
 */
export class AjaxResult<T = any> {
    /** 状态码 */
    status: number

    /** 响应数据 */
    data?: T

    /** 响应消息 */
    message?: string

    /** 响应状态 */
    success?: boolean

    constructor(data: any, status: number, message: string, success: boolean) {
        this.data = data
        this.status = status
        this.message = message
        this.success = success
    }

    /**
     * 返回成功
     * @param data 数据
     * @param msg 消息
     * @param ses 状态
     * @returns AjaxResult
     */
    static success<T = any>(data?: T, msg?: string, ses?: boolean, code?: number): AjaxResult<T> {
        const status = code || HttpStatus.OK
        const message = msg || '操作成功'
        const success = ses || true
        return new AjaxResult<T>(data, status, message, success)
    }

    /**
     * 返回失败
     * @param msg 消息
     * @param status 状态码
     * @returns AjaxResult
     */
    static error<T = null>(msg?: string, status?: number, ses?: boolean): AjaxResult<T> {
        status = status || HttpStatus.INTERNAL_SERVER_ERROR
        const message = msg || '操作失败'
        const success = ses || false
        return new AjaxResult<T>(null, status, message, success)
    }
}
