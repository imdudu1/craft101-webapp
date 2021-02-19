import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { ArticleEntity } from '../entities/article.entity';

@InputType()
export class CreateArticleInput extends PartialType(
  OmitType(ArticleEntity, ['id', 'author', 'comments', 'favoriteCount']),
  InputType,
) {}
