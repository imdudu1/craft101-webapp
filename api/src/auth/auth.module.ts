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

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      // TODO: Keeping secret keys secure
      secret: 'V3RY_STR0nG_S3CR3T_STR_vV2@v@$42AS2305(743',
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
