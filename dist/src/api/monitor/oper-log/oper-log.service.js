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
exports.OperLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const oper_log_entity_1 = require("./entities/oper-log.entity");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ajaxResult_1 = require("../../../common/ajaxResult");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
let OperLogService = class OperLogService {
    constructor(operLog) {
        this.operLog = operLog;
    }
    async operLogList(query) {
        let endTime;
        if (query.startAndEndTime) {
            endTime = new Date(query.startAndEndTime[1]);
        }
        const paginationService = new paginationResult_utils_1.PaginationService(this.operLog);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        operIp: (0, typeorm_2.Like)(`%${query.operIp ? query.operIp : ''}%`),
                        title: (0, typeorm_2.Like)(`%${query.title ? query.title : ''}%`),
                        operName: (0, typeorm_2.Like)(`%${query.operName ? query.operName : ''}%`),
                        operType: (0, typeorm_2.Like)(`%${query.operType ? query.operType : ''}%`),
                        operStatus: (0, typeorm_2.Like)(`%${query.operStatus ? query.operStatus : ''}%`),
                        createDate: query.startAndEndTime ? (0, typeorm_2.Between)(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
                    },],
                order: {
                    updateDate: "DESC",
                }
            },
        });
        return ajaxResult_1.AjaxResult.success(res);
    }
    async operLogDelete(id) {
        return ajaxResult_1.AjaxResult.success(await this.operLog.delete(id), '删除成功');
    }
    async operLogClear() {
        return ajaxResult_1.AjaxResult.success(await this.operLog.clear(), '清空成功');
    }
    async addOperLog(query) {
        await this.operLog.save(query);
    }
    async downloadExcel(operIds) {
        let list;
        if (operIds) {
            list = await this.operLog.find({
                where: {
                    operId: (0, typeorm_2.In)(operIds)
                }
            });
        }
        else {
            list = await this.operLog.find({
                order: {
                    createDate: "DESC",
                }
            });
        }
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.operId;
            item.operStatus = item.operStatus === '1' ? '成功' : '失败';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelHeader = [
            '模块标题', '操作类型', '操作人员', '操作方法', '操作地址', '操作地点', '操作状态', '请求URL', '请求方式', '请求参数', '请求返回结果', '请求错误消息', '请求耗时',
        ];
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '操作日志导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async operLogInfo(id) {
        const data = await this.operLog.findOneBy({ operId: id });
        return ajaxResult_1.AjaxResult.success(data);
    }
};
exports.OperLogService = OperLogService;
exports.OperLogService = OperLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(oper_log_entity_1.OperLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OperLogService);
//# sourceMappingURL=oper-log.service.js.map