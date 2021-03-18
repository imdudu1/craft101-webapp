import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Category } from './category.entity';

@ObjectType()
@Entity()
export class Article {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  thumbnail: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  explanation: string;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: ['insert'],
  })
  @JoinTable()
  tags?: Tag[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;
}
