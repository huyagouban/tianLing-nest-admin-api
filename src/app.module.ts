import { Module, UseFilters } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './api/system/menu/menu.module';
import { UserModule } from "./api/system/user/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpFilter } from "./common/catch";
import { LoginModule } from 'src/api/login/login.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from 'envConfig';
import { APP_GUARD,APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from "src/utils/guard/jwt-auth.guard";
import { RedisModule } from './api/redis/redis.module';
import { RoleModule } from './api/system/role/role.module';
import { ProfileModule } from './api/system/profile/profile.module';
import { ImageModule } from './api/upload/image/image.module';
import { DictModule } from './api/system/dict/dict.module';
import { DictDataModule } from './api/system/dict-data/dict-data.module';
import { RequireAuthGuard } from "src/utils/guard/require-auth.guard";
import { LoginLogModule } from 'src/api/monitor/login-log/login-log.module';
import { OperLogModule } from './api/monitor/oper-log/oper-log.module';
import { operLogInterceptor } from "src/utils/interceptors/oper.interceptors";
import { OnlineModule } from './api/monitor/online/online.module';
import { VideoModule } from './api/upload/video/video.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql", //数据库类型
        username: configService.get('DB_USERNAME'), //账号
        password: configService.get('DB_PASSWORD'), //密码
        host: configService.get('DB_HOST'), //host
        port: configService.get('DB_PORT'), //
        database: configService.get('DB_DATABASE'), //库名
        entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
        synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
        retryDelay: 500, //重试连接数据库间隔
        retryAttempts: 10,//重试连接数据库的次数
        autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      })

    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    RedisModule,
    RoleModule,
    UserModule,
    MenuModule,
    LoginModule,
    ProfileModule,
    ImageModule,
    DictModule,
    DictDataModule,
    LoginLogModule,
    OperLogModule,
    OnlineModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: HttpFilter
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RequireAuthGuard
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:operLogInterceptor,
    }
  ],
})
export class AppModule { }
