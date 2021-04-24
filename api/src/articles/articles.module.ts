import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { PlayerHistories } from '../live-mc/entities/player-histories.entity';
import { LiveMCModule } from '../live-mc/live-mc.module';
import { Articles } from './entities/articles.entity';
import { Categories } from './entities/categories.entity';
import { Comments } from './entities/comments.entity';
import { Recommendations } from './entities/recommendations.entity';
import { TagsRepository } from './repositories/tag.repository';
import { ArticlesResolver } from './resolvers/articles/articles.resolver';
import { CategoriesResolver } from './resolvers/categories/categories.resolver';
import { CommentsResolver } from './resolvers/comments/comments.resolver';
import { RecommendationsResolver } from './resolvers/recommendations/recommendations.resolver';
import { TagsResolver } from './resolvers/tags/tags.resolver';
import { ArticlesService } from './services/articles/articles.service';
import { CategoriesService } from './services/categories/categories.service';
import { CommentsService } from './services/comments/comments.service';
import { RecommendationsService } from './services/recommendations/recommendations.service';
import { TagsService } from './services/tags/tags.service';

@Module({
  imports: [
    forwardRef(() => LiveMCModule),
    TypeOrmModule.forFeature([
      Comments,
      Articles,
      Categories,
      TagsRepository,
      PlayerHistories,
      Recommendations,
    ]),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
  ],
  providers: [
    ArticlesResolver,
    ArticlesService,
    TagsResolver,
    TagsService,
    CommentsResolver,
    CommentsService,
    CategoriesResolver,
    CategoriesService,
    RecommendationsResolver,
    RecommendationsService,
  ],
  exports: [ArticlesService, TagsService, CommentsService, CategoriesService],
})
export class ArticlesModule {}
