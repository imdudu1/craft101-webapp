import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  UserEntity,
  ['email', 'username', 'password', 'nickname'] as const,
  InputType,
) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
