import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class CreateRecommendationOutputDto extends CommonOutput {
  @Field(() => Number, { nullable: true })
  count?: number;
}
