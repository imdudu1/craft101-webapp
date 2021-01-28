import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(_type => Number)
  id: number;

  @CreateDateColumn()
  @Field(_type => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(_type => Date)
  updatedAt: Date;
}
