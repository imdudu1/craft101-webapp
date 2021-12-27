import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { CommonOutput } from '../../../common/dtos/output.dto';

@ArgsType()
export default class LoginInput {
  @Field(() => String)
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{8,20}/)
  username: string;

  @Field(() => String)
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}

@ObjectType()
export class LoginOutput extends CommonOutput {
  @Field(() => String, { nullable: true })
  token?: string | null;
}
