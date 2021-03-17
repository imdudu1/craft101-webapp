import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';

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

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
