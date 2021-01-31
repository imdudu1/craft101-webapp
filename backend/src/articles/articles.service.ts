import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleInput } from './dto/create-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
  ) {}

  async create(
    author: UserEntity,
    createArticleInput: CreateArticleInput,
  ): Promise<ArticleEntity> {
    try {
      const newArticle = this.articlesRepository.create(createArticleInput);
      newArticle.author = author['profile'];
      console.log(newArticle);
      return this.articlesRepository.save(newArticle);
    } catch (e) {
      console.log(e);
    }
  }
}
