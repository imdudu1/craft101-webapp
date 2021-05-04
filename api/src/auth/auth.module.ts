import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../auth/controllers/auth.controller';
import { AuthResolver } from '../auth/resolvers/auth.resolver';
import { AuthService } from '../auth/services/auth.service';
import { UsersModule } from '../users/users.module';
import { CertifyEmailCodes } from './entities/certify-email-code.entity';
import { OAuthTokens } from './entities/oauth-tokens.entity';
import { AuthGuard } from './guards/auth.guard';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
    }),
    TypeOrmModule.forFeature([OAuthTokens, CertifyEmailCodes]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    AuthResolver,
    KakaoStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
