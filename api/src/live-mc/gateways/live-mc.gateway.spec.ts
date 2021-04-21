import { Test, TestingModule } from '@nestjs/testing';
import { LiveMCGateway } from './live-mc.gateway';

describe('LiveMCGateway', () => {
  let gateway: LiveMCGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveMCGateway],
    }).compile();

    gateway = module.get<LiveMCGateway>(LiveMCGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
