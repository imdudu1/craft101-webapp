import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { API_SERVER_URL } from '../../constants';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_API_KEY'),
      clientSecret: configService.get<string>('KAKAO_SECRET'),
      callbackURL: `${API_SERVER_URL}/auth/kakao/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const kakaoOAuth = {
      accessToken,
      refreshToken,
      profile,
    };
    return done(null, kakaoOAuth);
  }
}
