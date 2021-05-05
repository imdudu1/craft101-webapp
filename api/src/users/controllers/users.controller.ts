import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FRONT_SERVER_URL } from '../../constants';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {
    return;
  }

  @Get('kakao/callback')
  @Redirect('/', 301)
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req) {
    const token = await this.authService.createJwt(req.user);
    return {
      url: `${FRONT_SERVER_URL}/auth/kakao/${token}`,
    };
  }
}
