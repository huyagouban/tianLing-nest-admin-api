import { RequireMetadata } from 'src/common/constants/require-metadata.constant';
import { LoginUser } from "src/common/class/sys-login-user";
import { SecurityContext } from "src/utils/context/security.context";
import { LoginService } from "src/api/login/login.service";
import { UserService } from "src/api/system/user/user.service";
export declare class AuthServiceUtils {
    private securityContext;
    private loginService;
    private userService;
    constructor(securityContext: SecurityContext, loginService: LoginService, userService: UserService);
    checkLogin(): void;
    getLoginUser(): Promise<LoginUser>;
    getPermissionList(): Promise<string[]>;
    inPermission(permissions: string[], permission: string): boolean;
    hasPermission(permission: string): Promise<boolean>;
    checkPermissioniLogical(requirePermissions: RequireMetadata): Promise<void>;
    checkPermissioniLogicalAnd(permissions: string[]): Promise<void>;
    checkPermissioniLogicalOr(permissions: string[]): Promise<void>;
}
