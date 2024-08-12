"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtils = void 0;
const bcrypt = require("bcrypt");
class PasswordUtils {
    static async create(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    static async compare(rawPassword, hashPassword) {
        return await bcrypt.compare(rawPassword, hashPassword);
    }
}
exports.PasswordUtils = PasswordUtils;
PasswordUtils.saltRounds = 10;
//# sourceMappingURL=password.utils.js.map