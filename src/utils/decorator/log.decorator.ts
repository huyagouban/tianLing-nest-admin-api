import { SetMetadata } from '@nestjs/common'
import { OperType } from 'src/common/class/oper-log-enums'
import { LOGGER_LOG_METADATA } from 'src/common/constants/logger.constants'

export class LogOptions {
  /**
   * 日志标题
   */
  title: string

  /**
   * 操作类型
   */
  operType?: OperType = OperType.OTHER

  /**
   * 是否保存请求的参数
   */
  isSaveRequestData?: boolean = true

  /**
   * 是否保存响应的参数
   */
  isSaveResponseData?: boolean = true
}

/**
 * 自定义操作日志记录
 * @param options 日志配置
 * @returns MethodDecorator
 */
export const Log = (options: LogOptions) => {
  return SetMetadata(LOGGER_LOG_METADATA, Object.assign(new LogOptions(), options))
}
