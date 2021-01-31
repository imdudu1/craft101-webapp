import { InputType, PickType } from '@nestjs/graphql';
import { ArticleEntity } from '../entities/article.entity';

@InputType()
export class CreateArticleInput extends PickType(
  ArticleEntity,
  ['title', 'body', 'tagList'],
  InputType,
) {}
