import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { TagRepository } from './repositories/tag.repository';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagRepository: TagRepository,
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({
      id,
    });
  }

  async create({
    name,
    thumbnail,
    explanation,
    tags,
  }: CreateArticleDto): Promise<Article> {
    const newArticle = new Article();
    newArticle.name = name;
    newArticle.thumbnail = thumbnail;
    newArticle.explanation = explanation;
    newArticle.tags = [];
    for (const tag of tags) {
      newArticle.tags.push(await this.tagRepository.getOrCreate(tag));
    }
    return this.articleRepository.save(newArticle);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<boolean> {
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.articleRepository.delete({
      id,
    });
    return result.affected > 0;
  }
}
