import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommonEntity } from 'src/common/entities/core.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
@ObjectType()
export abstract class ArticleEntity extends CommonEntity {
  @Column()
  @Field(_type => String)
  @IsString()
  title: string;

  @Column({ default: '' })
  @Field(_type => String)
  @IsString()
  body: string;

  @Column('simple-array')
  @Field(_type => [String])
  @IsString({ each: true })
  tagList: string[];

  @ManyToOne(_type => UserEntity, user => user.articles)
  @Field(_type => UserEntity)
  author: UserEntity;

  @OneToMany(_type => CommentEntity, comment => comment.article, {
    eager: true,
  })
  @JoinColumn()
  @Field(_type => [CommentEntity])
  comments: CommentEntity[];

  @Column({ default: 0 })
  @Field(_type => Number)
  @IsNumber()
  favoriteCount: number;
}

@Entity()
@ObjectType()
export class ModArticleEntity extends ArticleEntity {
  @Column({ default: '' })
  @Field(_type => String)
  @IsString()
  description: string;

  @Column('simple-array')
  @Field(_type => [String])
  @IsString({ each: true })
  supportVersions: string[];
}

@Entity()
@ObjectType()
export class AdArticleEntity extends ArticleEntity {
  @Column()
  @Field(_type => String)
  @IsString()
  serverName: string;

  @Column()
  @Field(_type => String)
  @IsString()
  serverIP: string;

  @Column({ default: '' })
  @Field(_type => String)
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @Column({ default: '' })
  @Field(_type => String)
  @IsOptional()
  @IsString()
  homepageURL?: string;

  @Column({ default: '' })
  @Field(_type => String)
  @IsString()
  description: string;
}
