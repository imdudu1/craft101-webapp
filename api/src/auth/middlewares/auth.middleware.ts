import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWT_KEY_NAME } from 'src/constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    if (JWT_KEY_NAME in req.headers) {
      const token = req.headers[JWT_KEY_NAME];
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
