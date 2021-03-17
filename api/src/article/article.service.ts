import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({
      id,
    });
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(newArticle);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<boolean> {
    const updateArticle = await this.articleRepository.update(
      {
        id,
      },
      updateArticleDto,
    );
    return updateArticle.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.articleRepository.delete({
      id,
    });
    return result.affected > 0;
  }
}
