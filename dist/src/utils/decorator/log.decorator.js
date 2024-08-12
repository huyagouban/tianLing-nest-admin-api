"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LogOptions = void 0;
const common_1 = require("@nestjs/common");
const oper_log_enums_1 = require("../../common/class/oper-log-enums");
const logger_constants_1 = require("../../common/constants/logger.constants");
class LogOptions {
    constructor() {
        this.operType = oper_log_enums_1.OperType.OTHER;
        this.isSaveRequestData = true;
        this.isSaveResponseData = true;
    }
}
exports.LogOptions = LogOptions;
const Log = (options) => {
    return (0, common_1.SetMetadata)(logger_constants_1.LOGGER_LOG_METADATA, Object.assign(new LogOptions(), options));
};
exports.Log = Log;
//# sourceMappingURL=log.decorator.js.map