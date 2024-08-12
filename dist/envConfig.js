"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("node:fs");
const path = require("node:path");
const isProd = process.env.NODE_ENV === 'production';
function parseEnv() {
    const localEnv = path.resolve('.env.local');
    const prodEnv = path.resolve('.env.prod');
    if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv))
        throw new Error('缺少环境配置文件');
    const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
    return { path: filePath };
}
exports.default = parseEnv();
//# sourceMappingURL=envConfig.js.map