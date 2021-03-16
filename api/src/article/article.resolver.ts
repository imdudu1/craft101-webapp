import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { Article } from './entities/article.entity';

@Resolver(() => Article)
export class ArticleResolver {
  @Query(() => Article)
  article(@Args('id') id: number): Article {
    return new Article();
  }

  @Query(() => [Article])
  articles(): Article[] {
    return [];
  }

  @Mutation(() => Article)
  newArticle(@Args() createArticleDto: CreateArticleDto): Article {
    console.log(createArticleDto);
    return new Article();
  }

  @Mutation(() => Boolean)
  deleteArticle(@Args('id') id: number): boolean {
    return true;
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('id') id: number,
    @Args() updateArticleDto: UpdateArticleDto,
  ): Article {
    return new Article();
  }
}
