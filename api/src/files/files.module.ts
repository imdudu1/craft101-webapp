import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { FilesResolver } from './resolvers/files.resolver';
import { FilesService } from './services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files]), ConfigModule],
  providers: [FilesResolver, FilesService],
  exports: [FilesService],
})
export class FilesModule {}
