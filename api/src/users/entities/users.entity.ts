import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
registerEnumType(UserRole, { name: 'UserRole' });

export enum AccountType {
  KAKAO = 'KAKAO',
}
registerEnumType(AccountType, { name: 'AccountType' });

@ObjectType()
@Entity()
export class Users {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => AccountType)
  @Column({ type: 'enum', enum: AccountType })
  @IsEnum(AccountType)
  accountType: AccountType;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    return argon2.verify(this.password, aPassword);
  }
}
