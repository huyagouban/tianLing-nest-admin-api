"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityUtils = void 0;
const user_constants_1 = require("../../common/constants/user.constants");
class IdentityUtils {
    static isAdmin(userId) {
        return IdentityUtils.isAdminUser(userId);
    }
    static isAdminUser(userId) {
        return Number(userId) === user_constants_1.UserConstants.SUPER_USER;
    }
    static isAdminRole(roleId) {
        return Number(roleId) === user_constants_1.UserConstants.SUPER_ROLE;
    }
}
exports.IdentityUtils = IdentityUtils;
//# sourceMappingURL=identity.utils.js.map