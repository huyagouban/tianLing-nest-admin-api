import { Allow } from 'class-validator'
import { PagesDto } from "src/common/public/base-pages-entity";
/**
 * 查询在线用户
 */
export class ListOnlineDto extends PagesDto {
    /** IP地址 */
    @Allow()
    loginIp?: string

    /** 用户名称 */
    @Allow()
    loginName?: string
}
