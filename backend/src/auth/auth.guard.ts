import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    const gqlContext = GqlExecutionContext.create(context).getContext();
    if (roles === undefined) {
      return true;
    } else if (gqlContext['x-jwt'] !== undefined) {
      const encryptedToken = gqlContext['x-jwt'];
      const token = this.jwtService.verify(encryptedToken.toString());
      try {
        gqlContext['user'] = await this.usersService.findById(+token);
        const userRole = gqlContext['user'].profile.role;
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(userRole);
      } catch (error) {}
    }
    throw new UnauthorizedException();
  }
}
