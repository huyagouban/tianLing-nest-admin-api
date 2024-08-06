import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import { PUBLIC_METADATA } from "src/common/constants/security.constant";

// 用于实现各种身份验证和授权策略，例如基于角色的访问控制、JWT 验证、OAuth 认证等。它们可以在路由级别或处理程序级别应用，以确保请求的安全性和合法性。
// 在该方法中，您可以根据请求的特征、用户信息、权限等进行验证，并返回一个布尔值来表示是否允许请求继续执行。
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}