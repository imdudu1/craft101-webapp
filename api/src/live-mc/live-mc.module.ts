import { CacheModule, Module } from '@nestjs/common';
import { LiveMCGateway } from './live-mc.gateway';
import { LiveMCService } from './live-mc.service';
import * as redisStore from 'cache-manager-redis-store';
import { REDIS_HOST } from 'src/constants';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: REDIS_HOST,
      port: 6379,
    }),
  ],
  providers: [LiveMCGateway, LiveMCService],
  exports: [LiveMCService],
})
export class LiveMCModule {}
