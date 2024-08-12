"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestGlobalContext = void 0;
const request_context_1 = require("./request.context");
const security_context_1 = require("./security.context");
exports.NestGlobalContext = [request_context_1.RequestContext, security_context_1.SecurityContext];
//# sourceMappingURL=globalContext.js.map