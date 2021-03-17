import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import slugify from 'slugify';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async getOrCreate(name: string): Promise<Tag> {
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
