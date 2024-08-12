import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthServiceUtils } from 'src/utils/service/authSerice.utils';
export declare class RequireAuthGuard implements CanActivate {
    private reflector;
    private authService;
    constructor(reflector: Reflector, authService: AuthServiceUtils);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
