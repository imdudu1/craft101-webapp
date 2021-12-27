import { AccountType, UserRoles, Users } from '../../entities/users.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { JoinColumn } from 'typeorm';
import { Files } from '../../../files/entities/files.entity';
import { Articles } from '../../../articles/entities/articles.entity';
import { Comments } from '../../../articles/entities/comments.entity';
import { Recommendations } from '../../../articles/entities/recommendations.entity';

@ObjectType()
export class UserResponse {
  constructor(users: Users) {
    this.username = users.username.value;
    this.nickname = users.nickname.value;
    this.email = users.email.value;
    this.role = users.role;
    this.accountType = users.accountType;
    this.avatar = users.avatar;
    this.articles = users.articles;
    this.comments = users.comments;
    this.recommendations = users.recommendations;
    this.files = users.files;
  }

  @Field(() => String)
  username: string;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  //

  @Field(() => UserRoles)
  role: UserRoles;

  @Field(() => AccountType)
  accountType: AccountType;

  //

  @JoinColumn()
  avatar: Files;

  @Field(() => [Articles])
  articles: Articles[];

  @Field(() => [Comments])
  comments: Comments[];

  @Field(() => [Recommendations])
  recommendations: Recommendations[];

  @Field(() => [Files])
  files: Files[];
}
