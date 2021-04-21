import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ArticleType } from 'src/articles/entities/articles.entity';

@ArgsType()
export class CreateArticleDto {
  @Field(() => String)
  @IsUrl()
  thumbnail: string;

  @Field(() => String)
  @IsString()
  host: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  explanation: string;

  @Field(() => String)
  @IsString()
  @IsUrl()
  discord: string;

  @Field(() => String)
  @IsString()
  @IsUrl()
  homepage: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Field(() => Number)
  @IsNumber()
  category: number;

  @Field(() => ArticleType)
  @IsEnum(ArticleType)
  articleType: ArticleType;
}
