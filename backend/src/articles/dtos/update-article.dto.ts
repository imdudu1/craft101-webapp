import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { ArticleEntity } from '../entities/article.entity';

@InputType()
export class UpdateArticleProperties extends PartialType(
  ArticleEntity,
  InputType,
) {}

@InputType()
export class UpdateArticleInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => UpdateArticleProperties)
  data: UpdateArticleProperties;
}
