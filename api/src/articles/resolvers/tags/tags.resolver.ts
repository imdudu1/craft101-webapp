import { Args, Query, Resolver } from '@nestjs/graphql';
import { Articles } from 'src/articles/entities/articles.entity';
import { Tags } from 'src/articles/entities/tags.entity';
import { TagsService } from 'src/articles/services/tags/tags.service';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => [Articles])
  async tagArticles(@Args('tag') tagName: string): Promise<Articles[]> {
    return this.tagsService.tagArticles(tagName);
  }

  @Query(() => [Tags])
  async tags(): Promise<Tags[]> {
    return this.tagsService.allTags();
  }
}
