"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const menu_module_1 = require("./api/system/menu/menu.module");
const user_module_1 = require("./api/system/user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const catch_1 = require("./common/catch");
const login_module_1 = require("./api/login/login.module");
const config_1 = require("@nestjs/config");
const envConfig_1 = require("../envConfig");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./utils/guard/jwt-auth.guard");
const redis_module_1 = require("./api/redis/redis.module");
const role_module_1 = require("./api/system/role/role.module");
const profile_module_1 = require("./api/system/profile/profile.module");
const image_module_1 = require("./api/upload/image/image.module");
const dict_module_1 = require("./api/system/dict/dict.module");
const dict_data_module_1 = require("./api/system/dict-data/dict-data.module");
const require_auth_guard_1 = require("./utils/guard/require-auth.guard");
const login_log_module_1 = require("./api/monitor/login-log/login-log.module");
const oper_log_module_1 = require("./api/monitor/oper-log/oper-log.module");
const oper_interceptors_1 = require("./utils/interceptors/oper.interceptors");
const online_module_1 = require("./api/monitor/online/online.module");
const video_module_1 = require("./api/upload/video/video.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    type: "mysql",
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    retryDelay: 500,
                    retryAttempts: 10,
                    autoLoadEntities: true,
                })
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [envConfig_1.default.path],
            }),
            redis_module_1.RedisModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            menu_module_1.MenuModule,
            login_module_1.LoginModule,
            profile_module_1.ProfileModule,
            image_module_1.ImageModule,
            dict_module_1.DictModule,
            dict_data_module_1.DictDataModule,
            login_log_module_1.LoginLogModule,
            oper_log_module_1.OperLogModule,
            online_module_1.OnlineModule,
            video_module_1.VideoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'APP_FILTER',
                useClass: catch_1.HttpFilter
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: require_auth_guard_1.RequireAuthGuard
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: oper_interceptors_1.operLogInterceptor,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map