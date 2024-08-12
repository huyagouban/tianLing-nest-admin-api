export declare class AjaxResult<T = any> {
    status: number;
    data?: T;
    message?: string;
    success?: boolean;
    constructor(data: any, status: number, message: string, success: boolean);
    static success<T = any>(data?: T, msg?: string, ses?: boolean, code?: number): AjaxResult<T>;
    static error<T = null>(msg?: string, status?: number, ses?: boolean): AjaxResult<T>;
}
