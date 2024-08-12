"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_1 = require("./common/response");
const session = require("express-session");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(session({
        secret: 'tianLing',
        resave: true,
        saveUninitialized: true,
        name: 'tianLing.session',
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: false,
            sameSite: false,
        }
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '../../uploads/images'), {
        prefix: "/images"
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '../../uploads/video'), {
        prefix: "/video"
    });
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new response_1.Response());
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map