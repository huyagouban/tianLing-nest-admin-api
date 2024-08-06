import { Injectable } from '@nestjs/common';
import { CreateLoginLogDto, ListLoginLogDto } from './dto/login-log.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { LoginLog } from "src/api/monitor/login-log/entities/login-log.entity";
import { Repository, Like, Between, In } from 'typeorm';
import { BaseStatusEnums } from 'src/common/public/base-status.enums'
import { RequestContext } from "src/utils/context/request.context";
import { IpUtils } from "src/utils/ip/ip.utils";
import { AjaxResult } from "src/common/ajaxResult";
import { PaginationService } from "src/utils/PaginationResult/paginationResult.utils";
import { UAParser } from 'ua-parser-js'
import { DownloadExcelService } from "src/utils/ExcelService/ExcelService.utils";

const excelHeader = [
  '用户账号', '登录状态', 'IP地址', '登录地点', '操作信息', '浏览器', '操作系统',
]
/**
 * 登录日志
 */
@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog) private readonly loginLog: Repository<LoginLog>,
    private readonly requestContext: RequestContext,
  ) { }
  /**
   * 添加登录日志
   * @param loginLog 登录日志信息
   */
  async add(loginLog: CreateLoginLogDto) {
    await this.loginLog.save(loginLog)
  }
  /**
   * 登录日志列表
   * @param query 查询条件
   */
  async loginLogList(query: ListLoginLogDto): Promise<AjaxResult> {
    const paginationService = new PaginationService<LoginLog>(
      this.loginLog,
    );
    const res = await paginationService.paginate({
      currentPage: query.currentPage,
      pageSize: query.pageSize,
      options: {
        where: [{
          loginName: Like(`%${query.loginName ? query.loginName : ''}%`),
          loginStatus: Like(`%${query.loginStatus ? query.loginStatus : ''}%`),
        },],
        order: {
          createDate: "DESC",
        }
      },
    });

    return AjaxResult.success(res);
  }

  /**
     * 删除登录日志
     * @param id 登录日志id
     */
  async loginLogDelete(id: number[]): Promise<AjaxResult> {
    return AjaxResult.success(await this.loginLog.delete(id), '删除成功');
  }

  /**导出excel */
  async downloadExcel(loginIds?: number[]): Promise<AjaxResult> {

    /**
     * 1.查询数据
     * 2.导出excel
     */
    let list: LoginLog[];
    if (loginIds) {
      list = await this.loginLog.find({
        where: {
          loginId: In(loginIds)
        }
      })
    } else {
      list = await this.loginLog.find({
        order: {
          createDate: "DESC",
        }
      })
    }
    const excelList = list.map(item => {
      delete item.createDate
      delete item.updateDate
      delete item.loginId
      delete item.userAgent
      item.loginStatus = item.loginStatus === '1' ? '成功' : '失败'
      return Object.values(item)
    })
    const excelService = new DownloadExcelService()
    const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '登录日志导出')
    return AjaxResult.success(excelFile)
  }

  /**
   * 清空登录日志
   */
  async loginLogClear(): Promise<AjaxResult> {
    return AjaxResult.success(await this.loginLog.clear(), '清空成功')
  }
  /**
   * 登录成功
   * @param name 用户名称
   * @param message 登录消息
   */
  ok(name: string, message: string) {
    this.saveLoginLog(name, BaseStatusEnums.NORMAL, message)
  }
  /**
   * 登录失败
   * @param name 用户名称
   * @param message 登录消息
   */
  fail(name: string, message: string) {
    this.saveLoginLog(name, BaseStatusEnums.ABNORMAL, message)
  }

  /**
   * 保存登录日志
   * @param name 用户名称
   * @param status 状态
   * @param message 消息
   */
  private saveLoginLog(name: string, status: BaseStatusEnums, message: string) {
    const loginLog = new CreateLoginLogDto();
    loginLog.loginName = name;
    loginLog.loginStatus = status;
    loginLog.loginMessage = message;
    const request: any = this.requestContext.getRequest();
    const region = IpUtils.ip2Region(IpUtils.requestIp(request))
    loginLog.loginIp = IpUtils.requestIp(request);
    loginLog.loginLocation = `${region.country}${region.province}${region.city}`
    loginLog.userAgent = request.headers['user-agent'];
    const parser = new UAParser(loginLog.userAgent);
    loginLog.browser = `${parser.getBrowser().name}/${parser.getBrowser().version}`;
    loginLog.os = `${parser.getOS().name}/${parser.getOS().version}`;
    this.add(loginLog)
  }

}
