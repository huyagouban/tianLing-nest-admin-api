import { PagesDto } from "src/common/public/base-pages-entity";
import { OmitType } from '@nestjs/mapped-types'
import { Allow } from 'class-validator'
import { LoginLog } from "src/api/monitor/login-log/entities/login-log.entity";
/**
 * 登录日志列表
 */
export class ListLoginLogDto extends PagesDto {
    /** 用户名称 */
    @Allow()
    loginName?: string

    /** 登录状态 */
    @Allow()
    loginStatus?: string

    /** 登录时间 */
    @Allow()
    createTime?: string[]
}

/**
 * 创建登录日志
 */
export class CreateLoginLogDto extends OmitType(LoginLog, ['loginId'] as const) { }


/**
 * 导出登录日志
 */
export class DownloadExcel {
    /** 登录日志ID或者以逗号分隔的字符串 */
    loginLogIds : string;
}
