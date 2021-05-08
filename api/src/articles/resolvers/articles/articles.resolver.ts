import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateArticleDto } from 'src/articles/dtos/articleDtos/create-article.dto';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { McStatusOutputDto } from '../../../live-mc/dtos/mc-status-output.dto';
import { LiveMCService } from '../../../live-mc/services/live-mc.service';
import {
  ArticleDetailOutputDto,
  ServerArticleDetailOutputDto,
} from '../../dtos/articleDtos/article-detail.dto';
import {
  UpdateArticleDto,
  UpdateArticleOutputDto,
} from '../../dtos/articleDtos/update-article.dto';
import { Articles } from '../../entities/articles.entity';
import { ArticlesService } from '../../services/articles/articles.service';
import { CommentsService } from '../../services/comments/comments.service';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';

@Resolver(() => Articles)
export class ArticlesResolver {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly liveMCService: LiveMCService,
    private readonly commentsService: CommentsService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Query(() => ArticleDetailOutputDto)
  async article(@Args('id') id: number): Promise<ArticleDetailOutputDto> {
    return this.articleService.findArticleById(id);
  }

  @Query(() => ServerArticleDetailOutputDto)
  async serverArticle(
    @Args('id') id: number,
  ): Promise<ServerArticleDetailOutputDto> {
    const { article, ok, error } = await this.articleService.findArticleById(
      id,
    );
    let status: McStatusOutputDto | null = null;
    if (ok) {
      const { host } = article;
      status = await this.liveMCService.getMCServerStatus(host);
    }
    return {
      ok,
      article,
      status: status?.status,
      error: error || status?.error,
    };
  }

  @Query(() => [Articles])
  async articles(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ): Promise<Articles[]> {
    return this.articleService.paginateArticles(offset, limit);
  }

  @Query(() => [Articles])
  @AllowUserRoles(['ANY'])
  async myArticles(@AuthUser() authUser: number) {
    return this.articleService.userArticle(authUser);
  }

  @Mutation(() => Articles)
  @AllowUserRoles(['ANY'])
  async newArticle(
    @AuthUser() authUser: number,
    @Args() createArticleDto: CreateArticleDto,
  ): Promise<Articles> {
    return this.articleService.createArticle(authUser, createArticleDto);
  }

  @Mutation(() => Articles)
  @AllowUserRoles(['ANY'])
  async updateArticle(
    @Args('id') id: number,
    @AuthUser() authUser: number,
    @Args() updateArticleDto: UpdateArticleDto,
  ): Promise<UpdateArticleOutputDto> {
    return this.articleService.updateArticle(id, authUser, updateArticleDto);
  }

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async deleteArticle(
    @Args('id') id: number,
    @AuthUser() authUser: number,
  ): Promise<boolean> {
    return this.articleService.deleteArticle(id, authUser);
  }

  @ResolveField()
  async comments(@Parent() article: Articles) {
    return this.commentsService.findCommentsByArticleId(article.id);
  }

  @ResolveField()
  async recommendations(@Parent() article: Articles) {
    return this.recommendationsService.getArticleRecommendations(article.id);
  }
}
