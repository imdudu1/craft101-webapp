import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
