import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Recommendations extends CommonEntity {
  @Field(() => Users)
  @OneToOne(() => Users)
  user: Users;

  @Field(() => Articles)
  @ManyToOne(() => Articles, (article) => article.recommendations)
  article: Articles;
}
