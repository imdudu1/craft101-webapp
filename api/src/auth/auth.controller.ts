import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    return;
  }

  @Get('kakao/callback')
  @Redirect('/', 301)
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req, @Res() res) {
    const token = await this.authService.createJwt(req.user);
    // TODO: Edit redirect to front-end router URL
    const url = `https://www.gomi.land/auth/kakao/${token}`;
    return {
      url,
    };
  }
}
