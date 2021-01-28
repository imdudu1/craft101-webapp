import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class UserLoginInput extends PickType(
  UserEntity,
  ['username', 'password'] as const,
  InputType,
) {}

@ObjectType()
export class UserLoginOutput extends CommonOutput {
  @Field(_type => String, { nullable: true })
  token?: string;
}
