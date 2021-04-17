import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { UpdateCommentDto } from 'src/articles/dtos/commentDtos/update-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { CommentsService } from 'src/articles/services/comments/comments.service';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comments])
  async comments(@Args('articleId') articleId: number) {
    return this.commentsService.findCommentsByArticleId(articleId);
  }

  @Mutation(() => Boolean)
  async deleteComments(@Args('commentId') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }

  @Mutation(() => Comments)
  async updateComment(
    @Args('commentId') commentId: number,
    @Args('comment') updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Mutation(() => Comments)
  async newComment(
    @Args('articleId') articleId: number,
    @Args('comment') createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(articleId, createCommentDto);
  }
}
