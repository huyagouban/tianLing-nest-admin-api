import { Module, Global ,forwardRef} from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { LoginModule } from "src/api/login/login.module";

@Global() // 这里我们使用@Global 装饰器让这个模块变成全局的
@Module({
  imports: [
    forwardRef(() => LoginModule),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          ttl: configService.get('REDIS_TTL'),
          database: configService.get('REDIS_DB'),
          password: configService.get('REDIS_PASSWORD'),
        });
        return {
          store,
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule { }
