import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Articles } from './articles.entity';
import { Comments } from './comments.entity';

export enum RecommendationType {
  ARTICLE = 'ARTICLE',
  COMMENT = 'COMMENT',
}
registerEnumType(RecommendationType, { name: 'RecommendationType' });

@ObjectType()
@Entity()
export class Recommendations extends CommonEntity {
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.recommendations)
  user: Users;

  @Field(() => Articles, { nullable: true })
  @ManyToOne(() => Articles, (article) => article.recommendations)
  article?: Articles;

  @Field(() => Comments, { nullable: true })
  @ManyToOne(() => Comments, (comment) => comment.recommendations)
  comment?: Comments;

  @Field(() => RecommendationType)
  @Column({ type: 'enum', enum: RecommendationType })
  recommendationType: RecommendationType;
}
