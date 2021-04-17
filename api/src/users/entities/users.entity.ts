import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { IsEnum } from 'class-validator';
import { Comments } from 'src/articles/entities/comments.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
registerEnumType(UserRoles, { name: 'UserRole' });

export enum AccountType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
}
registerEnumType(AccountType, { name: 'AccountType' });

@ObjectType()
@Entity()
export class Users extends CommonEntity {
  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  nickname: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => Boolean)
  @Column({ default: false })
  certifyEmail: boolean;

  @Field(() => UserRoles)
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  @IsEnum(UserRoles)
  role: UserRoles;

  @Field(() => AccountType)
  @Column({ type: 'enum', enum: AccountType, default: AccountType.LOCAL })
  @IsEnum(AccountType)
  accountType: AccountType;

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.author)
  comments: Comments[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    return argon2.verify(this.password, aPassword);
  }
}
