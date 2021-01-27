import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as argon2 from 'argon2';
import { ArticleEntity } from 'src/articles/entities/article.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'admin',
  GENERAL = 'general',
}
registerEnumType(UserRole, { name: 'UserRole' });

@Entity()
@ObjectType()
export class UserEntity extends CoreEntity {
  @Column()
  @Field(_type => String)
  @IsString()
  @Length(5)
  username: string;

  @Column()
  @Field(_type => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(_type => String)
  @IsString()
  @Length(5, 20)
  nickname: string;

  @Column()
  @Field(_type => String)
  @IsString()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GENERAL,
  })
  @Field(_type => UserRole)
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Column({ default: false })
  @Field(_type => Boolean, { defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @OneToMany(_type => ArticleEntity, post => post.author)
  @Field(_type => [ArticleEntity])
  articles: ArticleEntity[];
}
