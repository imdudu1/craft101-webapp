import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { RecommendationType } from 'src/articles/entities/recommendations.entity';
import { CommonOutput } from 'src/common/dtos/output.dto';

@ArgsType()
export class AddRecommendationInputDto {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => RecommendationType)
  @IsEnum(RecommendationType)
  type: RecommendationType;
}

@ObjectType()
export class CreateRecommendationOutputDto extends CommonOutput {
  @Field(() => Number, { nullable: true })
  count?: number;
}
