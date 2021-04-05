import { Test, TestingModule } from '@nestjs/testing';
import { LiveMcService } from './live-mc.service';

describe('LiveMcService', () => {
  let service: LiveMcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveMcService],
    }).compile();

    service = module.get<LiveMcService>(LiveMcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
