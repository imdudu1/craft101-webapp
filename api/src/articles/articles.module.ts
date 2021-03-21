import { CacheModule, Module } from '@nestjs/common';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entity';
import { TagsRepository } from './repositories/tag.repository';
import { Categories } from './entities/categories.entity';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    TypeOrmModule.forFeature([Articles, Categories, TagsRepository]),
  ],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
