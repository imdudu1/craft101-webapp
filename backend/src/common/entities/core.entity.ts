import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';

@ObjectType()
export class CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(_type => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field(_type => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(_type => Date)
  @IsDate()
  updatedAt: Date;
}
