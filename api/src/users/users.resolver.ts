import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import LoginUserDto from './dtos/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => Users)
  async me(@AuthUser() authUser: Users): Promise<Users> {
    return this.usersService.findUserById(authUser.id);
  }

  @Mutation(() => Users)
  async newAccount(@Args() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Query(() => String)
  async login(@Args() { username, password }: LoginUserDto): Promise<string> {
    const token = await this.authService.validateLocalUser(username, password);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}
