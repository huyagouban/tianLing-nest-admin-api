import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from "./common/response";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from "express-session"
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 允许跨域
  app.enableCors()
  // 挂session
  app.use(session({
    // 用于生成会话签名的密钥,必须项 
    secret: 'tianLing',
    // 是否强制保存会话，即使未被修改也要保存。默认为true
    resave: true,
    // 强制将“未初始化”的会话保存到存储中。
    saveUninitialized: true,
    // 设置会话的名字，默认为connect.sid
    name: 'tianLing.session',
    // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    rolling: true,
    // coolie 配置
    cookie: {
      // 设置给定过期时间的毫秒数（date）
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // 是否以https的形式发送cookie
      secure: false,
      // 是否为同一站点的cookie（默认为false）
      sameSite: false,
    }
  }))
  app.useStaticAssets(join(__dirname, '../../uploads/images'), {
    prefix: "/images"
  })
  app.useStaticAssets(join(__dirname, '../../uploads/video'), {
    prefix: "/video"
  })
  // 接口统一前缀
  app.setGlobalPrefix('api')
  // 成功拦截
  app.useGlobalInterceptors(new Response());
  // 端口
  await app.listen(8080);
}
bootstrap();
