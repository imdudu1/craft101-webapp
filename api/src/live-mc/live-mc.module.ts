import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { ArticlesModule } from 'src/articles/articles.module';
import { PlayerHistories } from './entities/player-histories.entity';
import { LiveMCGateway } from './gateways/live-mc.gateway';
import { LiveMCService } from './services/live-mc.service';

@Module({
  imports: [
    forwardRef(() => ArticlesModule),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
    }),
    TypeOrmModule.forFeature([PlayerHistories]),
    ConfigModule,
  ],
  providers: [LiveMCGateway, LiveMCService],
  exports: [LiveMCService],
})
export class LiveMCModule {}
