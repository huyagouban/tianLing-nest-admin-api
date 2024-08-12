"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const ajaxResult_1 = require("./ajaxResult");
let Response = class Response {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(dataOf => {
            if (dataOf) {
                const data = dataOf.data;
                const message = dataOf.message;
                const success = dataOf.success;
                const status = dataOf.status == '1' ? 200 : dataOf.status;
                return ajaxResult_1.AjaxResult.success(data, message, success, status);
            }
        }));
    }
};
exports.Response = Response;
exports.Response = Response = __decorate([
    (0, common_1.Injectable)()
], Response);
//# sourceMappingURL=response.js.map