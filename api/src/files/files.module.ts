import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './controllers/files.controller';
import { Files } from './entities/files.entity';
import { FilesResolver } from './resolvers/files.resolver';
import { FilesService } from './services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files]), ConfigModule],
  providers: [FilesResolver, FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
