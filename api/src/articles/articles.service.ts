import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { TagRepository } from './repositories/tag.repository';
import { Tags } from './entities/tags.entity';
import { Categories } from './entities/categories.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectRepository(Articles)
    private readonly articleRepository: Repository<Articles>,
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
    private readonly tagRepository: TagRepository,
  ) {}

  //--START: TEST
  async setNum(num: number): Promise<number> {
    return this.cacheManager.set('num', num, { ttl: 60 * 15 });
  }

  async getNum(): Promise<number> {
    return this.cacheManager.get('num');
  }
  //--END: TEST

  //--START: Article methods
  async allArticles(): Promise<Articles[]> {
    return this.articleRepository.find();
  }

  async findArticleById(id: number): Promise<Articles> {
    return this.articleRepository.findOne({
      id,
    });
  }

  async tagArticles(tagName: string): Promise<Articles[]> {
    const tag: Tags = await this.tagRepository
      .createQueryBuilder('tag')
      .where({ name: tagName })
      .leftJoinAndSelect('tag.articles', 'article')
      .getOne();
    return tag.articles;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Articles> {
    // 문자열로 받은 태그 정보를 엔티티 정보로 변환
    const convertedTags = [];
    if (createArticleDto.tags !== undefined) {
      for (const tag of createArticleDto.tags) {
        convertedTags.push(await this.tagRepository.getOrCreate(tag));
      }
    }
    // 새 게시글 생성
    const article = new Articles();
    const created = Object.assign(article, createArticleDto);
    return this.articleRepository.save({
      tags: convertedTags,
      ...created,
    });
  }

  async updateArticle(
    id: number,
    { tags, ...data }: UpdateArticleDto,
  ): Promise<Articles> {
    const toUpdate = await this.articleRepository.findOne(id);
    const updated = Object.assign(toUpdate, data);
    if (tags !== undefined) {
      const convertedTags: Tags[] = [];
      for (const tag of tags) {
        convertedTags.push(await this.tagRepository.getOrCreate(tag));
      }
      updated.tags = convertedTags;
    }
    return this.articleRepository.save(updated);
  }

  async deleteArticle(id: number): Promise<boolean> {
    const result = await this.articleRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Article methods

  //--START: Tag methods
  async allTags(): Promise<Tags[]> {
    return this.tagRepository.find();
  }

  async findTagById(id: number): Promise<Tags> {
    return this.tagRepository.findOne(id);
  }
  //--END: Tag methods

  //--START: Category methods
  async allCategories(): Promise<Categories[]> {
    return this.categoryRepository.find();
  }

  async findCategoryById(id: number): Promise<Categories> {
    return this.categoryRepository.findOne(id);
  }

  async createCategory(name: string): Promise<Categories> {
    const newCategory = await this.categoryRepository.create({ name });
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(id: number, name: string): Promise<Categories> {
    const updated = new Categories();
    updated.name = name;
    return this.categoryRepository.save(updated);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Category methods
}
