import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { TagsRepository } from './repositories/tag.repository';
import { Tags } from './entities/tags.entity';
import { Categories } from './entities/categories.entity';
import { ArticleDetailOutputDto } from './dtos/article-detail.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly tagsRepository: TagsRepository,
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  //--START: Article methods
  async allArticles(offset: number, limit: number): Promise<Articles[]> {
    const count = await this.articlesRepository.createQueryBuilder().getCount();
    if (count < offset) return [];

    return this.articlesRepository
      .createQueryBuilder('articles')
      .offset(offset)
      .limit(limit)
      .getMany();
  }

  async findArticleById(id: number): Promise<ArticleDetailOutputDto> {
    try {
      const article = await this.articlesRepository.findOneOrFail({
        id,
      });
      return {
        ok: true,
        article,
      };
    } catch (e) {
      return { ok: false, error: 'Article not found.' };
    }
  }

  async tagArticles(tagName: string): Promise<Articles[]> {
    const tag: Tags = await this.tagsRepository
      .createQueryBuilder('tag')
      .where({ name: tagName })
      .leftJoinAndSelect('tag.articles', 'article')
      .getOne();
    return tag.articles;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Articles> {
    const { tags, ...otherParts } = createArticleDto;
    // 문자열로 받은 태그 정보를 엔티티 정보로 변환
    const convertedTags: Tags[] = [];
    if (tags !== undefined) {
      // TODO: 최적화를 위해 없는 태그에 대해 개별적인 INSERT가 아닌 일괄 INSERT가 되도록 수정
      await Promise.all(
        tags.map(async (tag) => {
          convertedTags.push(await this.tagsRepository.getOrCreate(tag));
        }),
      );
    }
    // 새 게시글 생성
    const created2 = this.articlesRepository.create();
    const created = Object.assign(created2, otherParts);
    return this.articlesRepository.save({
      ...created,
      tags: Promise.resolve(convertedTags),
    });
  }

  async updateArticle(
    id: number,
    { tags, ...data }: UpdateArticleDto,
  ): Promise<Articles> {
    const toUpdate = await this.articlesRepository.findOne(id);
    const updated = Object.assign(toUpdate, data);
    if (tags !== undefined) {
      const convertedTags: Tags[] = [];
      for (const tag of tags) {
        convertedTags.push(await this.tagsRepository.getOrCreate(tag));
      }
      updated.tags = Promise.resolve(convertedTags);
    }
    return this.articlesRepository.save(updated);
  }

  async deleteArticle(id: number): Promise<boolean> {
    const result = await this.articlesRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Article methods

  //--START: Tag methods
  async allTags(): Promise<Tags[]> {
    return this.tagsRepository.find();
  }

  async findTagById(id: number): Promise<Tags> {
    return this.tagsRepository.findOne(id);
  }
  //--END: Tag methods

  //--START: Category methods
  async allCategories(): Promise<Categories[]> {
    return this.categoriesRepository.find();
  }

  async findCategoryById(id: number): Promise<Categories> {
    return this.categoriesRepository.findOne(id);
  }

  async createCategory(name: string): Promise<Categories> {
    const newCategory = this.categoriesRepository.create({ name });
    return this.categoriesRepository.save(newCategory);
  }

  async updateCategory(id: number, name: string): Promise<Categories> {
    const updated = new Categories();
    updated.id = id;
    updated.name = name;
    return this.categoriesRepository.save(updated);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoriesRepository.delete(id);
    return result.affected > 0;
  }
  //--END: Category methods
}
