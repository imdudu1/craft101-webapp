import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    if ('x-jwt' in gqlContext && gqlContext['x-jwt'] !== undefined) {
      const encryptedToken = gqlContext['x-jwt'];
      const token = this.jwtService.verify(encryptedToken.toString());
      try {
        const user = await this.usersService.findById(+token);
        gqlContext['user'] = user;
        return true;
      } catch (error) {}
    }
    throw new UnauthorizedException();
  }
}
