"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityContext = void 0;
const common_1 = require("@nestjs/common");
const token_constants_1 = require("../../common/constants/token.constants");
const request_context_1 = require("./request.context");
let SecurityContext = class SecurityContext {
    constructor(requestContext) {
        this.requestContext = requestContext;
    }
    getRequest(req) {
        return req || this.requestContext.getRequest();
    }
    getToken(req) {
        const token = this.getRequest(req).get(token_constants_1.TokenConstants.AUTHENTICATION);
        return this.replaceTokenPrefix(token);
    }
    replaceTokenPrefix(token) {
        if (token && token.startsWith(token_constants_1.TokenConstants.PREFIX)) {
            return token.replace(token_constants_1.TokenConstants.PREFIX, '');
        }
        else {
            return token;
        }
    }
};
exports.SecurityContext = SecurityContext;
exports.SecurityContext = SecurityContext = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [request_context_1.RequestContext])
], SecurityContext);
//# sourceMappingURL=security.context.js.map