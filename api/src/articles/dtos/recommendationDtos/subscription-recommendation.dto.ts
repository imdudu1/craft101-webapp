import { Field, ObjectType } from '@nestjs/graphql';
import { RecommendationType } from 'src/articles/entities/recommendations.entity';

@ObjectType()
export class SubscribeRecommendationDto {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  count: number;

  @Field(() => RecommendationType)
  recommendationType: RecommendationType;
}
