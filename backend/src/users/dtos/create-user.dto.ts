import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  UserEntity,
  ['email', 'username', 'password', 'nickname'] as const,
  InputType,
) {}

@ObjectType()
export class CreateUserOutput extends CommonOutput {}
