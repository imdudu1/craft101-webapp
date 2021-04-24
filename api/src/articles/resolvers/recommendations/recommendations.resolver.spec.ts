import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsResolver } from './recommendations.resolver';

describe('RecommendationsResolver', () => {
  let resolver: RecommendationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationsResolver],
    }).compile();

    resolver = module.get<RecommendationsResolver>(RecommendationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
