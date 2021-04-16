import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { CommentsService } from 'src/articles/services/comments/comments.service';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comments)
  async newComment(
    @Args('articleId') articleId: number,
    @Args('comment') createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(articleId, createCommentDto);
  }
}
