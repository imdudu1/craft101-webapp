import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CommentEntity } from './entities/comment.entity';
import { ArticlesResolver } from './articles.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, CommentEntity]),
    UsersModule,
  ],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
