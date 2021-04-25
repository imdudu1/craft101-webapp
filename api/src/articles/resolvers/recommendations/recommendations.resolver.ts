import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CreateRecommendationOutputDto } from 'src/articles/dtos/recommendationDtos/create-recommendation.dto';
import { RecommendationsService } from 'src/articles/services/recommendations/recommendations.service';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { PUB_SUB } from 'src/pubsub/pubSub.module';
import { Users } from 'src/users/entities/users.entity';

const ARTICLE_RECOMMENDATION_ADDED_EVENT = 'articleRecommendationAdded';

@Resolver()
export class RecommendationsResolver {
  constructor(
    private readonly recommendationsService: RecommendationsService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => CreateRecommendationOutputDto)
  @AllowUserRoles(['ANY'])
  async increaseArticleRecommendation(
    @Args('articleId') articleId: number,
    @AuthUser() authUser: Users,
  ): Promise<CreateRecommendationOutputDto> {
    const result = await this.recommendationsService.increaseArticleRecommendation(
      articleId,
      authUser,
    );
    if (result.ok) {
      this.pubSub.publish(ARTICLE_RECOMMENDATION_ADDED_EVENT, {
        articleRecommendationAdded: {
          article: {
            id: articleId,
          },
          count: result.count,
        },
      });
    }
    return result;
  }

  @Subscription(() => Number, {
    filter: (payload, variables) =>
      payload.articleRecommendationAdded.article.id === variables.articleId,
    resolve: (payload) => {
      return payload.articleRecommendationAdded.count;
    },
  })
  articleRecommendationAdded(@Args('articleId') articleId: number) {
    return this.pubSub.asyncIterator(ARTICLE_RECOMMENDATION_ADDED_EVENT);
  }
}
