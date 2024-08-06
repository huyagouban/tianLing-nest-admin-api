import { RequestContext } from "src/utils/context/request.context";
import {  SecurityContext} from "src/utils/context/security.context";


export const NestGlobalContext = [RequestContext,SecurityContext]
