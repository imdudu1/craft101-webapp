import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddRecommendationInputDto,
  CreateRecommendationOutputDto,
} from 'src/articles/dtos/recommendationDtos/create-recommendation.dto';
import {
  Recommendations,
  RecommendationType,
} from 'src/articles/entities/recommendations.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendations)
    private readonly recommendationsRepository: Repository<Recommendations>,
  ) {}

  private generateRecommendTypeCondition(id: number, type: RecommendationType) {
    const typeName =
      RecommendationType.ARTICLE === type ? 'article' : 'comment';
    const result = {};
    result[typeName] = { id };
    return result;
  }

  private async isExistRecommendation(
    targetId: number,
    user: Users,
    recommendationType: RecommendationType,
  ): Promise<boolean> {
    const [
      _,
      numberOfRecommends,
    ] = await this.recommendationsRepository.findAndCount({
      where: {
        ...this.generateRecommendTypeCondition(targetId, recommendationType),
        user,
        recommendationType,
      },
    });
    return numberOfRecommends > 0;
  }

  async addRecommendation(
    { id, type }: AddRecommendationInputDto,
    user: Users,
  ): Promise<CreateRecommendationOutputDto> {
    const exist = await this.isExistRecommendation(id, user, type);
    if (exist) {
      return {
        ok: false,
        error: 'Already recommended',
      };
    }

    const condition = this.generateRecommendTypeCondition(id, type);
    await this.recommendationsRepository.save(
      this.recommendationsRepository.create({
        user,
        ...condition,
        recommendationType: type,
      }),
    );
    const count = await this.recommendationsRepository.count({
      ...condition,
    });
    return {
      ok: true,
      count,
    };
  }
}
