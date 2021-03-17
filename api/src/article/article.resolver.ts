import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => Article)
  async article(@Args('id') id: number): Promise<Article> {
    return this.articleService.getOne(id);
  }

  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @Mutation(() => Article)
  async newArticle(
    @Args() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Mutation(() => Boolean)
  async updateArticle(
    @Args('id') id: number,
    @Args() updateArticleDto: UpdateArticleDto,
  ): Promise<boolean> {
    return this.articleService.update(id, updateArticleDto);
  }

  @Mutation(() => Boolean)
  async deleteArticle(@Args('id') id: number): Promise<boolean> {
    return this.articleService.delete(id);
  }
}
