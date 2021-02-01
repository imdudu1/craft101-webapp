import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';
import { IsNumber } from 'class-validator';

@InputType()
class UpdateUserProperties extends PartialType(CreateUserInput) {}

@InputType()
export class UpdateUserInput {
  @Field(_type => Number)
  @IsNumber()
  id: number;

  @Field(_type => UpdateUserProperties)
  data: UpdateUserProperties;
}
