import { OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserRequest } from './create-user.request';

export class UpdateUserRequest extends PartialType(
  OmitType(CreateUserRequest, ['username']),
) {}
