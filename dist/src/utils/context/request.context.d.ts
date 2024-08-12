import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
export declare class RequestContext {
    private clsService;
    constructor(clsService: ClsService);
    getId(): number;
    getRequest(): Request;
    getResponse(): Response;
}
