"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineModule = void 0;
const common_1 = require("@nestjs/common");
const online_service_1 = require("./online.service");
const online_controller_1 = require("./online.controller");
const login_module_1 = require("../../login/login.module");
let OnlineModule = class OnlineModule {
};
exports.OnlineModule = OnlineModule;
exports.OnlineModule = OnlineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => login_module_1.LoginModule),
        ],
        controllers: [online_controller_1.OnlineController],
        providers: [online_service_1.OnlineService],
        exports: [online_service_1.OnlineService],
    })
], OnlineModule);
//# sourceMappingURL=online.module.js.map