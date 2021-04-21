import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { UpdateCommentDto } from 'src/articles/dtos/commentDtos/update-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { CommentsService } from 'src/articles/services/comments/comments.service';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Users } from 'src/users/entities/users.entity';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comments])
  async comments(@Args('articleId') articleId: number) {
    return this.commentsService.findCommentsByArticleId(articleId);
  }

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async deleteComments(
    @Args('commentId') commentId: number,
    @AuthUser() authUser: Users,
  ) {
    return this.commentsService.deleteComment(commentId, authUser);
  }

  @Mutation(() => Comments)
  @AllowUserRoles(['ANY'])
  async updateComment(
    @Args('commentId') commentId: number,
    @AuthUser() authUser: Users,
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
    @AuthUser() authUser: Users,
    @Args('comment') createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(
      articleId,
      authUser,
      createCommentDto,
    );
  }
}
