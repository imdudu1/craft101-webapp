import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from 'src/articles/dtos/articleDtos/create-article.dto';
import { Repository } from 'typeorm';
import { ArticleDetailOutputDto } from '../../dtos/articleDtos/article-detail.dto';
import {
  UpdateArticleDto,
  UpdateArticleOutputDto,
} from '../../dtos/articleDtos/update-article.dto';
import { Articles, ArticleType } from '../../entities/articles.entity';
import { Tags } from '../../entities/tags.entity';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
    private readonly tagsService: TagsService,
  ) {}

  async paginateArticles(offset: number, limit: number): Promise<Articles[]> {
    const count = await this.articlesRepository.createQueryBuilder().getCount();
    if (count < offset) return [];

    return this.articlesRepository
      .createQueryBuilder('articles')
      .offset(offset)
      .limit(limit)
      .getMany();
  }

  async userArticle(id: number): Promise<Articles[]> {
    return this.articlesRepository.find({
      author: {
        id,
      },
    });
  }

  async allArticles(): Promise<Articles[]> {
    return this.articlesRepository.find();
  }

  async allAdArticles(): Promise<Articles[]> {
    return this.articlesRepository.find({
      articleType: ArticleType.AD,
    });
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

  async createArticle(
    author: number,
    createArticleDto: CreateArticleDto,
  ): Promise<Articles> {
    const { tags, ...otherParts } = createArticleDto;
    const convertedTags: Tags[] = [];
    if (tags !== undefined) {
      await Promise.all(
        tags.map(async (tag) => {
          const tagObj = await this.tagsService.getOrCreate(tag);
          convertedTags.push(tagObj);
        }),
      );
    }
    const created = Object.assign(
      this.articlesRepository.create({ author: { id: author } }),
      {
        ...otherParts,
        tags: Promise.resolve(convertedTags),
      },
    );
    return this.articlesRepository.save(created);
  }

  async updateArticle(
    id: number,
    author: number,
    { tags, ...data }: UpdateArticleDto,
  ): Promise<UpdateArticleOutputDto> {
    const toUpdate = await this.articlesRepository.findOne({
      id,
      author: { id: author },
    });
    if (toUpdate) {
      const updated = Object.assign(toUpdate, data);
      if (tags !== undefined) {
        const convertedTags: Tags[] = [];
        await Promise.all(
          tags.map(async (tag) => {
            const tagObj = await this.tagsService.getOrCreate(tag);
            convertedTags.push(tagObj);
          }),
        );
        updated.tags = Promise.resolve(convertedTags);
      }
      const updatedArticle = await this.articlesRepository.save(updated);
      return {
        ok: true,
        article: updatedArticle,
      };
    }
    return {
      ok: false,
      error: 'Article not found',
    };
  }

  async deleteArticle(id: number, author: number): Promise<boolean> {
    const result = await this.articlesRepository
      .createQueryBuilder()
      .delete()
      .from(Articles)
      .where('id = :id')
      .andWhere('authorId = :author')
      .setParameters({
        id,
        author,
      })
      .execute();
    return result.affected > 0;
  }
}
