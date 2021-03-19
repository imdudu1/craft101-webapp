import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

@ArgsType()
export class UpdateArticleDto {
  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  thumbnail?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  explanation?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  category?: number;
}
