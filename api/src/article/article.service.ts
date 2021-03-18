import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { TagRepository } from './repositories/tag.repository';
import { Tag } from './entities/tag.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly tagRepository: TagRepository,
  ) {}

  //--START: Article methods
  async allArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findArticleById(id: number): Promise<Article> {
    return this.articleRepository.findOne({
      id,
    });
  }

  async tagArticles(tagName: string): Promise<Article[]> {
    const tag: Tag = await this.tagRepository
      .createQueryBuilder('tag')
      .where({ name: tagName })
      .leftJoinAndSelect('tag.articles', 'article')
      .getOne();
    return tag.articles;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    // 문자열로 받은 태그 정보를 엔티티 정보로 변환
    const convertedTags = [];
    if (createArticleDto.tags !== undefined) {
      for (const tag of createArticleDto.tags) {
        convertedTags.push(await this.tagRepository.getOrCreate(tag));
      }
    }
    // 새 게시글 생성
    const newArticle = new Article();
    const created = Object.assign(newArticle, createArticleDto);
    return this.articleRepository.save({
      tags: convertedTags,
      ...created,
    });
  }

  async updateArticle(
    id: number,
    { tags, ...data }: UpdateArticleDto,
  ): Promise<Article> {
    const toUpdate = await this.articleRepository.findOne(id);
    const updated = Object.assign(toUpdate, data);
    if (tags !== undefined) {
      const convertedTags: Tag[] = [];
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
  async allTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findTagById(id: number): Promise<Tag> {
    return this.tagRepository.findOne(id);
  }
  //--END: Tag methods

  //--START: Category methods
  async allCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async createCategory(name: string): Promise<Category> {
    const newCategory = await this.categoryRepository.create({ name });
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const updated = new Category();
    updated.name = name;
    return this.categoryRepository.save(updated);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Category methods
}
