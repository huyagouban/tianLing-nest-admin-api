"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const security_constant_1 = require("../../common/constants/security.constant");
const Public = () => (0, common_1.SetMetadata)(security_constant_1.PUBLIC_METADATA, true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map