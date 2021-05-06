import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { UpdateCommentDto } from 'src/articles/dtos/commentDtos/update-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { CommentsService } from 'src/articles/services/comments/comments.service';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { PUB_SUB } from 'src/pubsub/pubsub.module';

const COMMENT_ADDED_EVENT = 'commentAdded';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Query(() => [Comments])
  async comments(@Args('articleId') articleId: number) {
    return this.commentsService.findCommentsByArticleId(articleId);
  }

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async deleteComments(
    @Args('commentId') commentId: number,
    @AuthUser() authUser: number,
  ) {
    return this.commentsService.deleteComment(commentId, authUser);
  }

  @Mutation(() => Comments)
  @AllowUserRoles(['ANY'])
  async updateComment(
    @Args('commentId') commentId: number,
    @AuthUser() authUser: number,
    @Args('comment') updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(
      commentId,
      authUser,
      updateCommentDto,
    );
  }

  @Mutation(() => Comments)
  @AllowUserRoles(['ANY'])
  async newComment(
    @Args('articleId') articleId: number,
    @AuthUser() authUser: number,
    @Args('comment') createCommentDto: CreateCommentDto,
  ) {
    const newComment = await this.commentsService.createComment(
      articleId,
      authUser,
      createCommentDto,
    );
    this.pubSub.publish(COMMENT_ADDED_EVENT, { commentAdded: newComment });
    return newComment;
  }

  @Subscription(() => Comments, {
    filter: (payload, variables) =>
      payload.commentAdded.article.id === variables.articleId,
  })
  commentAdded(@Args('articleId') articleId: number) {
    return this.pubSub.asyncIterator(COMMENT_ADDED_EVENT);
  }
}
