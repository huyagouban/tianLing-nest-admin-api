import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { LoginUser } from 'src/common/class/sys-login-user'
import { SecurityConstants } from 'src/common/constants/security.constants'
import { TokenConstants } from 'src/common/constants/token.constants'
import { RequestContext } from 'src/utils/context/request.context'

/**
 * 安全上下文
 *
 * 注意：必须提前添加到请求对象中，否则这里无法获取。
 *  - 在 AuthFilter中通过设置请求头的方法传入。
 *  - 在 AuthGuard中通过添加到请求对象中的方法传入。
 */
@Injectable()
export class SecurityContext {
    constructor(private requestContext: RequestContext) { }

    /**
     * 获取 request
     */
    getRequest(req?: Request): Request {
        return req || this.requestContext.getRequest()
    }

    /**
     * 获取请求token
     */
    getToken(req?: Request): string {
        const token = this.getRequest(req).get(TokenConstants.AUTHENTICATION)
        return this.replaceTokenPrefix(token)
    }

    /**
     * 如果前端设置了令牌前缀，则裁剪掉前缀
     */
    private replaceTokenPrefix(token: string): string {
        if (token && token.startsWith(TokenConstants.PREFIX)) {
            return token.replace(TokenConstants.PREFIX, '')
        } else {
            return token
        }
    }
}
