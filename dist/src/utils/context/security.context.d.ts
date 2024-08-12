import { Request } from 'express';
import { RequestContext } from 'src/utils/context/request.context';
export declare class SecurityContext {
    private requestContext;
    constructor(requestContext: RequestContext);
    getRequest(req?: Request): Request;
    getToken(req?: Request): string;
    private replaceTokenPrefix;
}
