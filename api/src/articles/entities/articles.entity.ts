import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';
import { Categories } from './categories.entity';

@ObjectType()
@Entity()
export class Articles {
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

  @Field(() => String)
  @Column()
  discord: string;

  @Field(() => String)
  @Column()
  homepage: string;

  @Field(() => [Tags], { nullable: true })
  @ManyToMany(() => Tags, (tag) => tag.articles, {
    cascade: ['insert'],
  })
  @JoinTable()
  tags?: Promise<Tags[]>;

  @Field(() => Categories)
  @ManyToOne(() => Categories, (category) => category.articles)
  category: Categories;
}
