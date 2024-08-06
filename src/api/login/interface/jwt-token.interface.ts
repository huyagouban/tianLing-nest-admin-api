/**
 * Jwt Token 信息
 */
export interface JwtToken {
    /**
     * 用户会话
     */
    iat: string

    /**
     * 用户ID
     */
    userId: number

    /**
     * 用户名
     */
    userName: string
}
