import { InputType, PartialType } from '@nestjs/graphql';
import { ArticleEntity } from '../entities/article.entity';

@InputType()
export class CreateArticleInput extends PartialType(ArticleEntity, InputType) {}
