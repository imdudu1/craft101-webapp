import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateArticleInput } from './dto/create-article.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';

@Resolver()
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation(() => ArticleEntity)
  @UseGuards(AuthGuard)
  createArticle(
    @AuthUser() authUser: UserEntity,
    @Args('form') createArticleInput: CreateArticleInput,
  ): Promise<ArticleEntity> {
    return this.articlesService.create(authUser, createArticleInput);
  }
}
