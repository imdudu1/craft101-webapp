import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const encryptedToken = req.headers['x-jwt'];
      const token = this.jwtService.verify(encryptedToken.toString());
      try {
        const user = await this.usersService.findById(+token);
        req['user'] = user;
      } catch (error) {}
    }
    next();
  }
}
