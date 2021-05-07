import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Users } from './entities/users.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { Articles } from '../articles/entities/articles.entity';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    ArticlesModule,
    AuthModule,
    TypeOrmModule.forFeature([Users, Articles]),
    FilesModule,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
