import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Files } from 'src/files/entities/files.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Articles } from '../../articles/entities/articles.entity';
import { Comments } from '../../articles/entities/comments.entity';
import { Recommendations } from '../../articles/entities/recommendations.entity';
import { Password } from './vo/password.vo';
import { Username } from './vo/username.vo';
import { Nickname } from './vo/nickname.vo';
import { Email } from './vo/email.vo';

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

export type CreateUserProps = {
  username: Username;
  password: Password;
  nickname: Nickname;
  email: Email;
};

export type UpdateUserProps = Partial<Omit<Users, 'id' | 'username'>>;

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Users extends CommonEntity {
  @Field(() => String)
  @Column((type) => Username)
  username: Username;

  @Field(() => String)
  @Column((type) => Password)
  password: Password;

  @Field(() => String)
  @Column((type) => Nickname)
  nickname: Nickname;

  @Field(() => String)
  @Column((type) => Email)
  email: Email;

  //

  @Field(() => UserRoles)
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  @IsEnum(UserRoles)
  role: UserRoles;

  @Field(() => AccountType)
  @Column({ type: 'enum', enum: AccountType, default: AccountType.LOCAL })
  @IsEnum(AccountType)
  accountType: AccountType;

  //

  @JoinColumn()
  @OneToOne(() => Files, { nullable: true })
  avatar: Files;

  @Field(() => [Articles])
  @OneToMany(() => Articles, (article) => article.author)
  articles: Articles[];

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.author)
  comments: Comments[];

  @Field(() => [Recommendations])
  @OneToMany(() => Recommendations, (recommendation) => recommendation.user)
  recommendations: Recommendations[];

  @Field(() => [Files])
  @OneToMany(() => Files, (file) => file.user)
  files: Files[];

  isCertifiedUser(): boolean {
    return this.email.isCertifiedUser();
  }

  matchPassword(password: string): Promise<boolean> {
    return this.password.isMatch(new Password(password));
  }
}
