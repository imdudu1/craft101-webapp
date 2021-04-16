import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Categories } from 'src/articles/entities/categories.entity';
import { CategoriesService } from 'src/articles/services/categories/categories.service';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => Categories)
  async category(@Args('id') id: number): Promise<Categories> {
    return this.categoriesService.findCategoryById(id);
  }

  @Query(() => [Categories])
  async categories(): Promise<Categories[]> {
    return this.categoriesService.allCategories();
  }

  @Mutation(() => Categories)
  async newCategory(@Args('name') name: string): Promise<Categories> {
    return this.categoriesService.createCategory(name);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.categoriesService.deleteCategory(id);
  }
}
