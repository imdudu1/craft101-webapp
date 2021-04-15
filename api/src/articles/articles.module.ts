import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { LiveMCModule } from '../live-mc/live-mc.module';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';
import { Categories } from './entities/categories.entity';
import { TagsRepository } from './repositories/tag.repository';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    TypeOrmModule.forFeature([Articles, Categories, TagsRepository]),
    LiveMCModule,
  ],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
