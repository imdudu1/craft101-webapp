import { EntityRepository, Repository } from 'typeorm';
import { Tags } from '../entities/tags.entity';
import slugify from 'slugify';

@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {
  async getOrCreate(name: string): Promise<Tags> {
    const tagName = slugify(name.trim());
    let tag = await this.findOne({
      name: tagName,
    });
    if (!tag) {
      tag = await this.save(this.create({ name: tagName }));
    }
    return tag;
  }
}
