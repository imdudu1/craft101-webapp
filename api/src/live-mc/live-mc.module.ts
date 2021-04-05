import { Module } from '@nestjs/common';
import { LiveMcGateway } from './live-mc.gateway';
import { LiveMcService } from './live-mc.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [LiveMcGateway, LiveMcService],
})
export class LiveMcModule {}
