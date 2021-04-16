import { ArgsType, PartialType } from '@nestjs/graphql';
import { CreateArticleDto } from './create-article.dto';

@ArgsType()
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
