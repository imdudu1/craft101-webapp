import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Categories {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Articles])
  @OneToMany(() => Articles, (article) => article.category)
  articles: Articles[];
}
