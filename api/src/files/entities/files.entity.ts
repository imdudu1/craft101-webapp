import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Files extends CommonEntity {
  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  key: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.files, { eager: true })
  user: Users;
}
