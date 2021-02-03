import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class SelectRowInput {
  @Field(_type => Number)
  @IsNumber()
  id: number;
}
