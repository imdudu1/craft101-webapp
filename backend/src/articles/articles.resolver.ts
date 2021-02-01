import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateArticleInput } from './dto/create-article.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { UpdateArticleInput } from './dto/update-article.dto';

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

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteArticle(
    @AuthUser() authUser,
    @Args('id') articleId: number,
  ): Promise<boolean> {
    return this.articlesService.delete(authUser, articleId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  updateArticle(
    @AuthUser() authUser,
    @Args('form') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.update(authUser, updateArticleInput);
  }

  @Query(() => ArticleEntity)
  article(@Args('id') id: number): Promise<ArticleEntity> {
    return this.articlesService.find(id);
  }

  @Query(() => [ArticleEntity])
  articles(@Args('size') size: number): Promise<ArticleEntity[]> {
    return this.articlesService.findAll(size);
  }
}
