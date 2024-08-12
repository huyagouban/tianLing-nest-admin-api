"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const logical_constant_1 = require("../../common/constants/logical.constant");
const security_constant_1 = require("../../common/constants/security.constant");
const RequirePermissions = (value, logical = logical_constant_1.Logical.AND) => {
    return (0, common_1.SetMetadata)(security_constant_1.REQUIRE_PERMISSIONS_METADATA, {
        value: (0, lodash_1.isArray)(value) ? value : [value],
        logical,
    });
};
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=require-permissions.decorator.js.map