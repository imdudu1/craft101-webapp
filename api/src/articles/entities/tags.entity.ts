import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Articles } from './articles.entity';

@ObjectType()
@Entity()
export class Tags {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Articles])
  @ManyToMany(() => Articles, (article) => article.tags)
  articles: Promise<Articles[]>;
}
