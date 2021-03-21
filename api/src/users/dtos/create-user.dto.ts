import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

@ArgsType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{8,20}/)
  username: string;

  @Field(() => String)
  @IsString()
  @Matches(/^\$2[ayb]\$[\d]{2}\$[./A-Za-z0-9]{53}$/)
  password: string;

  @Field(() => String)
  @IsString()
  @Length(5, 20)
  nickname: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}
