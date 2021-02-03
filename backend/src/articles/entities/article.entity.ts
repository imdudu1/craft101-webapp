import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommonEntity } from 'src/common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ArticleType {
  NORMAL = 'NORMAL',
  MOD = 'MOD',
  AD = 'AD',
}

registerEnumType(ArticleType, { name: 'ArticleType' });

@Entity()
@ObjectType()
@InputType('ArticleInputType', { isAbstract: true })
export class ArticleEntity extends CommonEntity {
  /**
   * Common article columns
   */
  @ManyToOne(_type => UserEntity, user => user.articles)
  @Field(_type => UserEntity, { nullable: true })
  @IsOptional()
  author?: UserEntity;

  @Column()
  @Field(_type => String)
  @IsString()
  title: string;

  @Column({ default: '' })
  @Field(_type => String)
  @IsString()
  body: string;

  @Column('simple-array', { default: '' })
  @Field(_type => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  tagList?: string[];

  @OneToMany(_type => CommentEntity, comment => comment.article, {
    eager: true,
  })
  @Field(_type => [CommentEntity], { nullable: true })
  @IsOptional()
  comments?: CommentEntity[];

  @Column({ default: 0 })
  @Field(_type => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  favoriteCount?: number;

  @Column({ default: '' })
  @Field(_type => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({
    type: 'enum',
    enum: ArticleType,
  })
  @Field(_type => ArticleType)
  @IsEnum(ArticleType)
  articleType: ArticleType;

  /**
   * Mod article columns
   */
  @Column('simple-array', { default: '' })
  @Field(_type => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  supportVersions?: string[];

  /**
   * Ad article columns
   */
  @Column({ default: '' })
  @Field(_type => String, { nullable: true })
  @IsOptional()
  @IsString()
  serverName?: string;

  @Column({ default: '' })
  @Field(_type => String, { nullable: true })
  @IsOptional()
  @IsString()
  serverIP?: string;

  @Column({ default: '' })
  @Field(_type => String, { nullable: true })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @Column({ default: '' })
  @Field(_type => String, { nullable: true })
  @IsOptional()
  @IsString()
  homepageURL?: string;
}
