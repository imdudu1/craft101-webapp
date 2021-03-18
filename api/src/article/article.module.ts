import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { TagRepository } from './repositories/tag.repository';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, TagRepository])],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
