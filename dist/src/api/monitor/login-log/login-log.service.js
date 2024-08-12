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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginLogService = void 0;
const common_1 = require("@nestjs/common");
const login_log_dto_1 = require("./dto/login-log.dto");
const typeorm_1 = require("@nestjs/typeorm");
const login_log_entity_1 = require("./entities/login-log.entity");
const typeorm_2 = require("typeorm");
const base_status_enums_1 = require("../../../common/public/base-status.enums");
const request_context_1 = require("../../../utils/context/request.context");
const ip_utils_1 = require("../../../utils/ip/ip.utils");
const ajaxResult_1 = require("../../../common/ajaxResult");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ua_parser_js_1 = require("ua-parser-js");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
const excelHeader = [
    '用户账号', '登录状态', 'IP地址', '登录地点', '操作信息', '浏览器', '操作系统',
];
let LoginLogService = class LoginLogService {
    constructor(loginLog, requestContext) {
        this.loginLog = loginLog;
        this.requestContext = requestContext;
    }
    async add(loginLog) {
        await this.loginLog.save(loginLog);
    }
    async loginLogList(query) {
        const paginationService = new paginationResult_utils_1.PaginationService(this.loginLog);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        loginName: (0, typeorm_2.Like)(`%${query.loginName ? query.loginName : ''}%`),
                        loginStatus: (0, typeorm_2.Like)(`%${query.loginStatus ? query.loginStatus : ''}%`),
                    },],
                order: {
                    createDate: "DESC",
                }
            },
        });
        return ajaxResult_1.AjaxResult.success(res);
    }
    async loginLogDelete(id) {
        return ajaxResult_1.AjaxResult.success(await this.loginLog.delete(id), '删除成功');
    }
    async downloadExcel(loginIds) {
        let list;
        if (loginIds) {
            list = await this.loginLog.find({
                where: {
                    loginId: (0, typeorm_2.In)(loginIds)
                }
            });
        }
        else {
            list = await this.loginLog.find({
                order: {
                    createDate: "DESC",
                }
            });
        }
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.loginId;
            delete item.userAgent;
            item.loginStatus = item.loginStatus === '1' ? '成功' : '失败';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '登录日志导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async loginLogClear() {
        return ajaxResult_1.AjaxResult.success(await this.loginLog.clear(), '清空成功');
    }
    ok(name, message) {
        this.saveLoginLog(name, base_status_enums_1.BaseStatusEnums.NORMAL, message);
    }
    fail(name, message) {
        this.saveLoginLog(name, base_status_enums_1.BaseStatusEnums.ABNORMAL, message);
    }
    saveLoginLog(name, status, message) {
        const loginLog = new login_log_dto_1.CreateLoginLogDto();
        loginLog.loginName = name;
        loginLog.loginStatus = status;
        loginLog.loginMessage = message;
        const request = this.requestContext.getRequest();
        const region = ip_utils_1.IpUtils.ip2Region(ip_utils_1.IpUtils.requestIp(request));
        loginLog.loginIp = ip_utils_1.IpUtils.requestIp(request);
        loginLog.loginLocation = `${region.country}${region.province}${region.city}`;
        loginLog.userAgent = request.headers['user-agent'];
        const parser = new ua_parser_js_1.UAParser(loginLog.userAgent);
        loginLog.browser = `${parser.getBrowser().name}/${parser.getBrowser().version}`;
        loginLog.os = `${parser.getOS().name}/${parser.getOS().version}`;
        this.add(loginLog);
    }
};
exports.LoginLogService = LoginLogService;
exports.LoginLogService = LoginLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(login_log_entity_1.LoginLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        request_context_1.RequestContext])
], LoginLogService);
//# sourceMappingURL=login-log.service.js.map