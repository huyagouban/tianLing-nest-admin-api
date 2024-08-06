import { OmitType } from '@nestjs/mapped-types'
import { PagesDto } from "src/common/public/base-pages-entity";
import { Allow } from 'class-validator'
import { OperLog } from 'src/api/monitor/oper-log/entities/oper-log.entity'

/**
 * 查询操作日志
 */
export class ListOperLogDto extends PagesDto {

    /** 操作地址 */
    @Allow()
    operIp?: string

    
    /** 模块标题 */
    @Allow()
    title?: string

    /** 操作类型 */
    @Allow()
    operType?: string

    /** 操作人员 */
    @Allow()
    operName?: string

    /** 操作状态 */
    @Allow()
    operStatus?: string

    /** 请求地址 */
    @Allow()
    requestUrl?: string

    /** 操作时间 */
    @Allow()
    startAndEndTime?: string[]
}

/**
 * 添加操作日志
 */
export class CreateOperLogDto extends OmitType(OperLog, ['operId'] as const) { }


/**
 * 导出操作日志
 */
export class OperLogDownloadExcel {
    /** 登录日志ID或者以逗号分隔的字符串 */
    operIds : string;
}
