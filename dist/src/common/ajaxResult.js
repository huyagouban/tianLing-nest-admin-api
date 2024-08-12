"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxResult = void 0;
const common_1 = require("@nestjs/common");
class AjaxResult {
    constructor(data, status, message, success) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.success = success;
    }
    static success(data, msg, ses, code) {
        const status = code || common_1.HttpStatus.OK;
        const message = msg || '操作成功';
        const success = ses || true;
        return new AjaxResult(data, status, message, success);
    }
    static error(msg, status, ses) {
        status = status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = msg || '操作失败';
        const success = ses || false;
        return new AjaxResult(null, status, message, success);
    }
}
exports.AjaxResult = AjaxResult;
//# sourceMappingURL=ajaxResult.js.map