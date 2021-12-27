import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

@ArgsType()
export class CreateUserRequest {
  @Field(() => String)
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{8,20}/)
  username: string;

  @Field(() => String)
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;

  @Field(() => String)
  @IsString()
  @Length(5, 20)
  nickname: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}
