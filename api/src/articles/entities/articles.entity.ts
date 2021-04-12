import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Tags } from './tags.entity';
import { Categories } from './categories.entity';
import { CommonEntity } from 'src/common/entities/common.entity';

@InputType('ArticleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Articles extends CommonEntity {
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
  @Column({ default: 'localhost', nullable: true })
  host: string;

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
