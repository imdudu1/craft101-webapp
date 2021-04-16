import { Injectable } from '@nestjs/common';
import { Articles } from 'src/articles/entities/articles.entity';
import { Tags } from 'src/articles/entities/tags.entity';
import { TagsRepository } from 'src/articles/repositories/tag.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async allTags(): Promise<Tags[]> {
    return this.tagsRepository.find();
  }

  async findTagById(id: number): Promise<Tags> {
    return this.tagsRepository.findOne(id);
  }

  async getOrCreate(tag: string) {
    return this.tagsRepository.getOrCreate(tag);
  }

  async tagArticles(tagName: string): Promise<Articles[]> {
    const tag: Tags = await this.tagsRepository
      .createQueryBuilder('tag')
      .where({ name: tagName })
      .leftJoinAndSelect('tag.articles', 'article')
      .getOne();
    return tag.articles;
  }
}
