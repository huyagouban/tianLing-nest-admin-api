import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RequireMetadata } from 'src/common/constants/require-metadata.constant'
import { REQUIRE_PERMISSIONS_METADATA } from 'src/common/constants/security.constant'
import { AuthServiceUtils } from 'src/utils/service/authSerice.utils'

/**
 * 权限校验守卫
 */
@Injectable()
export class RequireAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthServiceUtils
  ) {}

 async canActivate(context: ExecutionContext): Promise<boolean> {
    /** 校验 @RequirePermissions 装饰器 */ 
    const requirePermissions = this.reflector.get<RequireMetadata>(REQUIRE_PERMISSIONS_METADATA, context.getHandler())
    if (requirePermissions) {
      await this.authService.checkPermissioniLogical(requirePermissions)
    }
    return true
  }
}
