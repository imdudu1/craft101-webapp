import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Users } from './entities/users.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
