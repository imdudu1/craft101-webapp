import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      if (token) {
        const currentUser = await this.authService.verifyJwt(token);
        if (currentUser) {
          req['user'] = currentUser;
        }
      }
    }
    next();
  }
}
