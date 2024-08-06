import { Injectable, Req, Request, HttpException} from '@nestjs/common';
import { Logical } from 'src/common/constants/logical.constant'
import { RequireMetadata } from 'src/common/constants/require-metadata.constant'
import { UserConstants } from "src/common/constants/user.constants";
import { AjaxResult } from "src/common/ajaxResult";
import { LoginUser } from "src/common/class/sys-login-user"
import { SecurityContext } from "src/utils/context/security.context";
import { LoginService } from "src/api/login/login.service";
import { UserService } from "src/api/system/user/user.service";
/**
 * 认证服务
 */
@Injectable()
export class AuthServiceUtils {
    constructor(
        private securityContext: SecurityContext,
        private loginService: LoginService,
        private userService: UserService
    ) { }
    /**
  * 检验用户是否已经登录，如果未登录，则抛出异常: NotLoginException
  */
    checkLogin() {
        this.getLoginUser()
    }

    /**
 * 获取当前用户缓存信息, 如果未登录，则抛出异常: NotLoginException
 */
    async getLoginUser(): Promise<LoginUser> {
        const token = this.securityContext.getToken()
        if (!token) {
            throw AjaxResult.error("token不能为空")
        }

        const jwtKey = this.loginService.parseToken(token);
        const loginUser = await this.userService.loginUserInfo(jwtKey);
        if (!loginUser) {
            
            throw AjaxResult.error("token已过期或验证不正确！",401)
        }

        return loginUser
    }
    /**
  * 获取当前用户的权限列表
  */
    async getPermissionList(): Promise<string[]> {
        try {
            const loginUser = await this.getLoginUser()
            return loginUser.permissions
        } catch (error) {
            return []
        }
    }

    /**
     * 判断是否包含权限
     * @param permissions 权限列表
     * @param permission 权限字符串
     * @returns 用户是否具备某权限
     */
    inPermission(permissions: string[], permission: string): boolean {
        return permissions.includes(UserConstants.SUPER_ROLE_PERMISSION) || permissions.includes(permission)
    }
    /**
  * 验证用户是否具备某权限
  * @param permission 权限字符串
  * @returns 用户是否具备某权限
  */
    async hasPermission(permission: string): Promise<boolean> {
        return this.inPermission(await this.getPermissionList(), permission)
    }

    /**
   * 根据装饰器(@RequirePermissions)鉴权, 如果验证未通过，则抛出异常: NotPermissionException
   * @param requirePermissions 装饰器对象
   */
    async checkPermissioniLogical(requirePermissions: RequireMetadata) {
        if (requirePermissions.logical === Logical.AND) {
            await this.checkPermissioniLogicalAnd(requirePermissions.value)
        } else {
            await this.checkPermissioniLogicalOr(requirePermissions.value)
        }
    }
    /**
   * 验证用户是否含有指定权限，必须全部拥有
   * @param permissions 权限列表
   */
    async checkPermissioniLogicalAnd(permissions: string[]) {
        for (const permission of permissions) {
            if (!await this.hasPermission(permission)) {
                // throw  new HttpException("没有权限访问该资源", 401)
                throw AjaxResult.error("没有权限访问该资源", 403)
            }
        }
    }

    /**
     * 验证用户是否含有指定权限，只需包含其中一个
     * @param permissions 权限码数组
     */
    async checkPermissioniLogicalOr(permissions: string[]) {
        for (const permission of permissions) {
            if (await this.hasPermission(permission)) {
                return
            }
        }
        if (permissions.length > 0) {
            // throw  new HttpException("没有权限访问该资源", 401)
            throw AjaxResult.error("没有权限访问该资源", 403)
        }
    }
}