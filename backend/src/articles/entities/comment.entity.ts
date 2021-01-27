import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
@ObjectType()
export class CommentEntity extends CoreEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  @Field(_type => UserEntity)
  author: UserEntity;

  @Column()
  @Field(_type => String)
  @IsString()
  body: string;

  @OneToOne(() => CommentEntity)
  @JoinColumn()
  @Field(_type => CommentEntity)
  parentComment: CommentEntity;

  @ManyToOne(type => ArticleEntity, post => post.comments)
  @Field(_type => ArticleEntity)
  article: ArticleEntity;
}
