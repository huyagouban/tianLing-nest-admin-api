import { User } from '../../api/system/user/entities/user.entity'

/**
 * 登录信息
 */
export class LoginUser {
  /**
   * 用户会话Key
   */
  userSk: string

  /**
   * 用户Id
   */
  userId: number

  /**
   * 用户名
   */
  userName: string

  /**
   * 登录时间
   */
  loginTime: number

  /**
   * 过期时间
   */
  expireTime: number

  /**
   * 登录IP地址
   */
  loginIp: string

  /**
   * 权限列表
   */
  permissions: string[]

  /**
   * 角色列表
   */
  roles: string[]

  /**
   * 用户信息
   */
  user: User


  /** 登录编号 */
  tokenId: number


  /** 登录名称 */
  loginName: string


  /** 登录地点 */
  loginLocation: string


  /** 浏览器 */
  browser: string


  /** 操作系统 */
  os: string

  /** token创建时间 */
  iat: number
}
