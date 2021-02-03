import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateArticleInput } from './dtos/create-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { UpdateArticleInput } from './dtos/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
  ) {}

  /**
   * 일반 게시글 생성
   * @param author
   * @param createArticleInput
   */
  async create(
    author: UserEntity,
    createArticleInput: CreateArticleInput,
  ): Promise<ArticleEntity> {
    try {
      const newArticle = this.articlesRepository.create(createArticleInput);
      newArticle.author = author;
      console.log(newArticle);
      return this.articlesRepository.save(newArticle);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 일반 게시글 삭제
   * @param requestUser
   * @param articleId
   */
  async delete(requestUser: UserEntity, articleId: number): Promise<boolean> {
    try {
      await getRepository(ArticleEntity)
        .createQueryBuilder()
        .delete()
        .from(ArticleEntity)
        .where('id = :articleId', { articleId })
        .andWhere('authorId = :userId', {
          userId: requestUser.id,
        })
        .execute();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 일반 게시글 수정
   */
  async update(
    requestUser: UserEntity,
    { id, data }: UpdateArticleInput,
  ): Promise<boolean> {
    try {
      await getRepository(ArticleEntity)
        .createQueryBuilder()
        .update()
        .set({ ...data })
        .where('id = :id', { id })
        .andWhere('authorId = :userId', {
          userId: requestUser.id,
        })
        .execute();
      await this.articlesRepository.update(id, { ...data });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 요청한 특정 게시글 조회
   */
  async find(id: number): Promise<ArticleEntity> {
    return getRepository(ArticleEntity)
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  /**
   * 다수개의 게시글을 조회
   */
  async findAll(limit: number): Promise<ArticleEntity[]> {
    return getRepository(ArticleEntity)
      .createQueryBuilder()
      .select()
      .limit(limit)
      .getMany();
  }
}
