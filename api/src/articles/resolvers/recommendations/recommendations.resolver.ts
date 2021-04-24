import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateRecommendationOutputDto } from 'src/articles/dtos/recommendationDtos/create-recommendation.dto';
import { RecommendationsService } from 'src/articles/services/recommendations/recommendations.service';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Users } from 'src/users/entities/users.entity';

@Resolver()
export class RecommendationsResolver {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Mutation(() => CreateRecommendationOutputDto)
  @AllowUserRoles(['ANY'])
  async addRecommendation(
    @Args('articleId') articleId: number,
    @AuthUser() authUser: Users,
  ): Promise<CreateRecommendationOutputDto> {
    return this.recommendationsService.addRecommendation(articleId, authUser);
  }
}
