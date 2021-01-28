import { ArgsType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';
import { IsNumber } from 'class-validator';
import { CommonOutput } from '../../common/dtos/output.dto';

@ArgsType()
export class UserProfileInput {
  @Field(_type => Number)
  @IsNumber()
  userId: number;
}

@ObjectType()
export class UserProfileProperties extends OmitType(UserEntity, ['password']) {}

@ObjectType()
export class UserProfileOutput extends CommonOutput {
  @Field(_type => UserProfileProperties, { nullable: true })
  data?: UserProfileProperties;
}
