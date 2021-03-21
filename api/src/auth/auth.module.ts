import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthTokens } from './entities/oauth-tokens.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'V3RY_STR0nG_S3CR3T_STR_vV2@v@$42AS2305(743',
    }),
    TypeOrmModule.forFeature([OAuthTokens]),
  ],
  providers: [AuthService, AuthResolver, KakaoStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
