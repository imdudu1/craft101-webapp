import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Articles } from './entities/articles.entity';
import { ArticlesService } from './articles.service';
import { Categories } from './entities/categories.entity';
import { Tags } from './entities/tags.entity';

@Resolver(() => Articles)
export class ArticlesResolver {
  constructor(private readonly articleService: ArticlesService) {}

  @Query(() => Articles)
  async article(@Args('id') id: number): Promise<Articles> {
    return this.articleService.findArticleById(id);
  }

  @Query(() => [Articles])
  async articles(): Promise<Articles[]> {
    return this.articleService.allArticles();
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
