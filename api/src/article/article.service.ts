import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { TagRepository } from './repositories/tag.repository';
import { Tag } from './entities/tag.entity';

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

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const convertedTags = [];
    if (createArticleDto.tags !== undefined) {
      for (const tag of createArticleDto.tags) {
        convertedTags.push(await this.tagRepository.getOrCreate(tag));
      }
    }

    const newArticle = new Article();
    const created = Object.assign(newArticle, createArticleDto);
    return this.articleRepository.save({ ...created, tags: convertedTags });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const convertedTags: Tag[] = [];
    if (updateArticleDto.tags !== undefined) {
      for (const tag of updateArticleDto.tags) {
        convertedTags.push(await this.tagRepository.getOrCreate(tag));
      }
    }

    const toUpdate = await this.articleRepository.findOne(id);
    const updated = Object.assign(toUpdate, updateArticleDto);
    return await this.articleRepository.save({
      ...updated,
      tags: convertedTags,
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.articleRepository.delete({
      id,
    });
    return result.affected > 0;
  }
}
