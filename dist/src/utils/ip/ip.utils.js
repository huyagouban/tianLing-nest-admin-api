"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpUtils = void 0;
const ip2region_1 = require("ip2region");
const request_ip_1 = require("request-ip");
class IpUtils {
}
exports.IpUtils = IpUtils;
_a = IpUtils;
IpUtils.IP2RegionInstance = new ip2region_1.default();
IpUtils.requestIp = (req) => (0, request_ip_1.getClientIp)(req);
IpUtils.ip2Region = (ip) => _a.IP2RegionInstance.search(ip);
//# sourceMappingURL=ip.utils.js.map