import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Categories extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Articles])
  @OneToMany(() => Articles, (article) => article.category)
  articles: Articles[];
}
