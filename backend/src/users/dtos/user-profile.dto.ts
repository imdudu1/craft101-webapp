import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';
import { CommonOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class UserProfileProperties extends OmitType(UserEntity, ['password']) {}

@ObjectType()
export class UserProfileOutput extends CommonOutput {
  @Field(_type => UserProfileProperties, {
    nullable: true,
  })
  profile?: UserProfileProperties;
}
