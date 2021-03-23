import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';

@ArgsType()
export default class LoginUserDto {
  @Field(() => String)
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{8,20}/)
  username: string;

  @Field(() => String)
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}
