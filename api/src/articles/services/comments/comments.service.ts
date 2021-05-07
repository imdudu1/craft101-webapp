import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/articles/dtos/commentDtos/create-comment.dto';
import { UpdateCommentDto } from 'src/articles/dtos/commentDtos/update-comment.dto';
import { Comments } from 'src/articles/entities/comments.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    private readonly articlesService: ArticlesService,
  ) {}

  async findCommentsByArticleId(articleId: number): Promise<Comments[]> {
    return this.commentsRepository.find({
      article: {
        id: articleId,
      },
    });
  }

  async findUserComments(userId: number): Promise<Comments[]> {
    return this.commentsRepository.find({
      author: {
        id: userId,
      },
    });
  }

  async deleteComment(id: number, author: number): Promise<DeleteResult> {
    return this.commentsRepository.delete({
      id,
      author: {
        id: author,
      },
    });
  }

  async updateComment(
    id: number,
    author: number,
    { content }: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentsRepository.update(
      {
        id,
        author: {
          id: author,
        },
      },
      {
        content,
      },
    );
  }

  async createComment(
    articleId: number,
    author: number,
    { content }: CreateCommentDto,
  ): Promise<Comments> {
    const { article, ok } = await this.articlesService.findArticleById(
      articleId,
    );
    if (ok) {
      const newComment = this.commentsRepository.create({
        article,
        content,
        author: {
          id: author,
        },
      });
      return this.commentsRepository.save(newComment);
    }
  }
}
