import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { CreateArticleDto } from './create-article.dto';
import { CommonOutput } from '../../../common/dtos/output.dto';
import { Articles } from '../../entities/articles.entity';

@ArgsType()
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class UpdateArticleOutputDto extends CommonOutput {
  @Field(() => Articles, { nullable: true })
  article?: Articles;
}
