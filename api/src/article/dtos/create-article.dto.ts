import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@ArgsType()
export class CreateArticleDto {
  @Field(() => String)
  @IsUrl()
  thumbnail: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  explanation: string;

  @Field(() => [String])
  @IsString({ each: true })
  tags: string[];
}
