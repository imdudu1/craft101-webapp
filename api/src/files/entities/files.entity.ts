import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Files extends CommonEntity {
  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  key: string;
}
