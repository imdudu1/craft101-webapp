import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { ArticleEntity } from '../entities/article.entity';

@InputType()
export class UpdateArticleProperties extends PickType(
  ArticleEntity,
  ['title', 'body', 'tagList'],
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
