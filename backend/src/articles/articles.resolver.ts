import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateArticleInput } from './dtos/create-article.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { UpdateArticleInput } from './dtos/update-article.dto';
import { SelectRowInput } from '../common/dtos/select-row.dto';
import { GetArticlesInput } from './dtos/get-articles.dto';
import { Role } from '../auth/role.decorator';

@Resolver()
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(() => ArticleEntity)
  article(@Args() { id }: SelectRowInput): Promise<ArticleEntity> {
    return this.articlesService.find(id);
  }

  @Query(() => [ArticleEntity])
  articles(@Args() { size }: GetArticlesInput): Promise<ArticleEntity[]> {
    return this.articlesService.findAll(size);
  }

  @Mutation(() => ArticleEntity)
  @Role(['Any'])
  createArticle(
    @AuthUser() authUser: UserEntity,
    @Args('form') createArticleInput: CreateArticleInput,
  ): Promise<ArticleEntity> {
    return this.articlesService.create(authUser, createArticleInput);
  }

  @Mutation(() => Boolean)
  @Role(['Any'])
  deleteArticle(
    @AuthUser() authUser: UserEntity,
    @Args() { id }: SelectRowInput,
  ): Promise<boolean> {
    return this.articlesService.delete(authUser, id);
  }

  @Mutation(() => Boolean)
  @Role(['Any'])
  updateArticle(
    @AuthUser() authUser: UserEntity,
    @Args('form') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.update(authUser, updateArticleInput);
  }
}
