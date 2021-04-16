import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { Repository } from 'typeorm';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    private readonly articlesService: ArticlesService,
  ) {}

  async createComment(
    articleId: number,
    { content }: CreateCommentDto,
  ): Promise<Comments> {
    const { article, ok } = await this.articlesService.findArticleById(
      articleId,
    );
    if (ok) {
      const newComment = this.commentsRepository.create({
        article,
        content,
      });
      return this.commentsRepository.save(newComment);
    }
  }
}
