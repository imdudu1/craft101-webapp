import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetArticlesInput {
  @Field(_type => Number)
  @IsNumber()
  size: number;
}
