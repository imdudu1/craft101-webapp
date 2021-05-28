import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
