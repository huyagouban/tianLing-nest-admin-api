import { RequestContext } from "src/utils/context/request.context";
import { SecurityContext } from "src/utils/context/security.context";
export declare const NestGlobalContext: (typeof RequestContext | typeof SecurityContext)[];
