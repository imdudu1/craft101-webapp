import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecommendationOutputDto } from 'src/articles/dtos/recommendationDtos/create-recommendation.dto';
import { Recommendations } from 'src/articles/entities/recommendations.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendations)
    private readonly recommendationsRepository: Repository<Recommendations>,
  ) {}

  async addRecommendation(
    articleId: number,
    user: Users,
  ): Promise<CreateRecommendationOutputDto> {
    const [
      _,
      numOfRecommends,
    ] = await this.recommendationsRepository.findAndCount({
      where: {
        article: {
          id: articleId,
        },
        user,
      },
    });
    if (numOfRecommends > 0) {
      return {
        ok: false,
        error: 'Already recommended',
      };
    }
    this.recommendationsRepository.save(
      this.recommendationsRepository.create({
        article: {
          id: articleId,
        },
        user,
      }),
    );
    return {
      ok: true,
    };
  }
}
