import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
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

  @Field(() => [String])
  // @Column()
  tags: string[];
}
