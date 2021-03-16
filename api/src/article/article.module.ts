import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';

@Module({
  providers: [ArticleResolver],
})
export class ArticleModule {}
