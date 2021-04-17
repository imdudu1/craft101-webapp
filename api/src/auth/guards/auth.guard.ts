import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedRoles, AnyRole } from '../decorators/allow-user-role.decorator';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    )!;
    console.log(roles);
    if (!roles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token: string = gqlContext.token;
    if (token) {
      const user = await this.authService.verifyJwt(token);
      if (user) {
        gqlContext['user'] = user;
        if (roles.includes(AnyRole)) {
          return true;
        }
        return roles.includes(user.role);
      }
    }
    return false;
  }
}
