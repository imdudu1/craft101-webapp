import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => Article)
  async article(@Args('id') id: number): Promise<Article> {
    return this.articleService.findArticleById(id);
  }

  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    return this.articleService.allArticles();
  }

  @Query(() => [Article])
  async tagArticles(@Args('tag') tagName: string): Promise<Article[]> {
    return this.articleService.tagArticles(tagName);
  }

  @Mutation(() => Article)
  async newArticle(
    @Args() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.createArticle(createArticleDto);
  }

  @Mutation(() => Article)
  async updateArticle(
    @Args('id') id: number,
    @Args() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(id, updateArticleDto);
  }

  @Mutation(() => Boolean)
  async deleteArticle(@Args('id') id: number): Promise<boolean> {
    return this.articleService.deleteArticle(id);
  }
}

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return this.articleService.allTags();
  }
}

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => Category)
  async category(@Args('id') id: number): Promise<Category> {
    return this.articleService.findCategoryById(id);
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.articleService.allCategories();
  }

  @Mutation(() => Category)
  async newCategory(@Args('name') name: string): Promise<Category> {
    return this.articleService.createCategory(name);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.articleService.deleteCategory(id);
  }
}
