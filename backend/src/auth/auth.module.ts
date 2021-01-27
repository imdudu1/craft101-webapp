import { Module } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [JwtService, UsersService],
})
export class AuthModule {}
