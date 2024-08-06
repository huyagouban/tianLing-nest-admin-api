/**
 * 权限 Key 常量
 */
export class SecurityConstants {
  /**
   * 用户会话字段
   */
  static readonly USER_SK = 'userSk'

  /**
   * 用户ID字段
   */
  static readonly USER_ID = 'userId'

  /**
   * 用户对象字段
   * userId
   * userName
   */
  static readonly USER = 'user'

  /**
   * 用户名字段
   */
  static readonly USER_NAME = 'userName'

  /**
   * 登录用户字段
   */
  static readonly LOGIN_USER = 'loginUser'

  /**
   * 授权信息字段
   */
  static readonly AUTHENTICATION = 'authorization'

  /**
   * 请求来源
   */
  static readonly FROM_SOURCE = 'fromSource'

  /**
   * 内部请求
   */
  static readonly SOURCE_INNER = 'sourceInner'
}
