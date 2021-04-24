import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Recommendations extends CommonEntity {
  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.recommendations)
  user: Users;

  @Field(() => Articles)
  @ManyToOne(() => Articles, (article) => article.recommendations)
  article: Articles;
}
