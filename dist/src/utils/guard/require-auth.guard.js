"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const security_constant_1 = require("../../common/constants/security.constant");
const authSerice_utils_1 = require("../service/authSerice.utils");
let RequireAuthGuard = class RequireAuthGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const requirePermissions = this.reflector.get(security_constant_1.REQUIRE_PERMISSIONS_METADATA, context.getHandler());
        if (requirePermissions) {
            await this.authService.checkPermissioniLogical(requirePermissions);
        }
        return true;
    }
};
exports.RequireAuthGuard = RequireAuthGuard;
exports.RequireAuthGuard = RequireAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        authSerice_utils_1.AuthServiceUtils])
], RequireAuthGuard);
//# sourceMappingURL=require-auth.guard.js.map