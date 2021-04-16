import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/articles/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

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
}
