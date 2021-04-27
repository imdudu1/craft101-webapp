import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  AddRecommendationInputDto,
  CreateRecommendationOutputDto,
} from 'src/articles/dtos/recommendationDtos/create-recommendation.dto';
import { SubscribeRecommendationDto } from 'src/articles/dtos/recommendationDtos/subscription-recommendation.dto';
import { RecommendationType } from 'src/articles/entities/recommendations.entity';
import { RecommendationsService } from 'src/articles/services/recommendations/recommendations.service';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Users } from 'src/users/entities/users.entity';

const RECOMMENDATION_ADDED_EVENT = 'recommendationAdded';

@Resolver()
export class RecommendationsResolver {
  constructor(
    private readonly recommendationsService: RecommendationsService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Mutation(() => CreateRecommendationOutputDto)
  @AllowUserRoles(['ANY'])
  async addRecommendation(
    @Args() createRecommendationInputDto: AddRecommendationInputDto,
    @AuthUser() authUser: Users,
  ): Promise<CreateRecommendationOutputDto> {
    const result = await this.recommendationsService.addRecommendation(
      createRecommendationInputDto,
      authUser,
    );
    if (result.ok) {
      this.pubSub.publish(RECOMMENDATION_ADDED_EVENT, {
        recommendationAdded: {
          id: createRecommendationInputDto.id,
          count: result.count,
          recommendationType: createRecommendationInputDto.type,
        },
      });
    }
    return result;
  }

  @Subscription(() => SubscribeRecommendationDto, {
    filter: (payload, variables) =>
      payload.recommendationAdded.id === variables.id &&
      payload.recommendationAdded.recommendationType === variables.type,
    resolve: (payload) => {
      return {
        id: payload.recommendationAdded.id,
        count: payload.recommendationAdded.count,
        recommendationType: payload.recommendationAdded.recommendationType,
      };
    },
  })
  recommendationAdded(
    @Args('id') id: number,
    @Args('type') type: RecommendationType,
  ) {
    return this.pubSub.asyncIterator(RECOMMENDATION_ADDED_EVENT);
  }
}
