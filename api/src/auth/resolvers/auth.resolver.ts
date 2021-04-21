import { Mutation, Resolver } from '@nestjs/graphql';
import { Users } from '../../users/entities/users.entity';
import { AuthUser } from '../decorators/auth-user.decorator';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => Boolean)
  async requestCertifyEmail(@AuthUser() authUser: Users): Promise<boolean> {
    return this.authService.generateCertifyEmailCode(authUser.id);
  }

  @Mutation(() => Boolean)
  async confirmCertifyEmailCode(
    @AuthUser() authUser: Users,
    code: number,
  ): Promise<boolean> {
    return this.authService.verifyCertifyEmailCode(authUser.id, code);
  }
}
