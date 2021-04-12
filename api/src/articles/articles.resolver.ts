import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Articles } from './entities/articles.entity';
import { ArticlesService } from './articles.service';
import { Categories } from './entities/categories.entity';
import { Tags } from './entities/tags.entity';
import {
  ArticleDetailOutputDto,
  ServerArticleDetailOutputDto,
} from './dtos/article-detail.dto';
import { LiveMCService } from '../live-mc/live-mc.service';
import { McStatusOutputDto } from '../live-mc/dtos/mc-status-output.dto';

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
    let status: McStatusOutputDto = null;
    if (ok) {
      const { host } = article;
      status = await this.liveMCService.getMCServerStatus(host);
      return {
        ok: true,
        article: article,
        status: status?.status,
      };
    }
    return {
      ok,
      error,
    };
  }

  @Query(() => [Articles])
  async articles(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ): Promise<Articles[]> {
    return this.articleService.allArticles(offset, limit);
  }

  @Query(() => [Articles])
  async tagArticles(@Args('tag') tagName: string): Promise<Articles[]> {
    return this.articleService.tagArticles(tagName);
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

@Resolver(() => Tags)
export class TagResolver {
  constructor(private readonly articleService: ArticlesService) {}

  @Query(() => [Tags])
  async tags(): Promise<Tags[]> {
    return this.articleService.allTags();
  }
}

@Resolver(() => Categories)
export class CategoryResolver {
  constructor(private readonly articleService: ArticlesService) {}

  @Query(() => Categories)
  async category(@Args('id') id: number): Promise<Categories> {
    return this.articleService.findCategoryById(id);
  }

  @Query(() => [Categories])
  async categories(): Promise<Categories[]> {
    return this.articleService.allCategories();
  }

  @Mutation(() => Categories)
  async newCategory(@Args('name') name: string): Promise<Categories> {
    return this.articleService.createCategory(name);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.articleService.deleteCategory(id);
  }
}
