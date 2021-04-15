import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class PlayerHistories extends CommonEntity {
  @Field(() => Number)
  onlinePlayers: number;

  @Field(() => Articles)
  @ManyToOne(() => Articles, (article) => article.playerHistories)
  article: Articles;
}
