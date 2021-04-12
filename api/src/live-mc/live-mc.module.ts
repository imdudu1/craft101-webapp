import { CacheModule, Module } from '@nestjs/common';
import { LiveMCGateway } from './live-mc.gateway';
import { LiveMCService } from './live-mc.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [LiveMCGateway, LiveMCService],
  exports: [LiveMCService],
})
export class LiveMCModule {}
