import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_API_KEY,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: 'https://api.gomi.land/auth/kakao/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const user = await this.authService.validateKakaoUser(profile);
    await this.authService.storeAccessTokens(user, accessToken, refreshToken);
    return done(null, user.id);
  }
}
