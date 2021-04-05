import { Test, TestingModule } from '@nestjs/testing';
import { LiveMcGateway } from './live-mc.gateway';

describe('LiveMcGateway', () => {
  let gateway: LiveMcGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveMcGateway],
    }).compile();

    gateway = module.get<LiveMcGateway>(LiveMcGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
