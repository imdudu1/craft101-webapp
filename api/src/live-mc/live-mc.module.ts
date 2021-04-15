import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { ArticlesModule } from 'src/articles/articles.module';
import { REDIS_HOST } from 'src/constants';
import { PlayerHistories } from './entities/player-histories.entity';
import { LiveMCGateway } from './live-mc.gateway';
import { LiveMCService } from './live-mc.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: REDIS_HOST,
      port: 6379,
    }),
    TypeOrmModule.forFeature([PlayerHistories]),
    forwardRef(() => ArticlesModule),
  ],
  providers: [LiveMCGateway, LiveMCService],
  exports: [LiveMCService],
})
export class LiveMCModule {}
