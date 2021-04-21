import { Test, TestingModule } from '@nestjs/testing';
import { LiveMCService } from './live-mc.service';

describe('LiveMCService', () => {
  let service: LiveMCService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveMCService],
    }).compile();

    service = module.get<LiveMCService>(LiveMCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
