import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';

@InputType()
class UpdateUserProperties extends PartialType(CreateUserInput) {}

@InputType()
export class UpdateUserInput {
  @Field(_type => Number)
  id: number;

  @Field(_type => UpdateUserProperties)
  data: UpdateUserProperties;
}
