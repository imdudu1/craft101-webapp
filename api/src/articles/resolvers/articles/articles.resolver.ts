import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { McStatusOutputDto } from '../../../live-mc/dtos/mc-status-output.dto';
import { LiveMCService } from '../../../live-mc/services/live-mc.service';
import {
  ArticleDetailOutputDto,
  ServerArticleDetailOutputDto,
} from '../../dtos/articleDtos/article-detail.dto';
import { CreateArticleDto } from '../../dtos/articleDtos/create-article.dto';
import { UpdateArticleDto } from '../../dtos/articleDtos/update-article.dto';
import { Articles } from '../../entities/articles.entity';
import { ArticlesService } from '../../services/articles/articles.service';

@Resolver(() => Articles)
export class ArticlesResolver {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly liveMCService: LiveMCService,
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

  @Mutation(() => Articles)
  async newArticle(
    @Args() createArticleDto: CreateArticleDto,
  ): Promise<Articles> {
    return this.articleService.createArticle(createArticleDto);
  }

  @Mutation(() => Articles)
  async updateArticle(
    @Args('id') id: number,
    @Args() updateArticleDto: UpdateArticleDto,
  ): Promise<Articles> {
    return this.articleService.updateArticle(id, updateArticleDto);
  }

  @Mutation(() => Boolean)
  async deleteArticle(@Args('id') id: number): Promise<boolean> {
    return this.articleService.deleteArticle(id);
  }
}
