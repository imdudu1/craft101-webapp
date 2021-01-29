import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { UserLoginInput, UserLoginOutput } from './dtos/login-user.dto';
import { UpdateUserInput } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SelectUserInput, UserProfileOutput } from './dtos/user-profile.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('form') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => UserProfileOutput)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser): UserProfileOutput {
    return authUser;
  }

  @Query(() => UserProfileOutput)
  async userProfile(
    @Args() { userId }: SelectUserInput,
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userId);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('form') updateUserDto: UpdateUserInput,
  ): Promise<boolean> {
    return this.usersService.update(updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser({ userId }: SelectUserInput): Promise<boolean> {
    return this.usersService.delete(userId);
  }

  @Query(() => UserLoginOutput)
  login(@Args('form') loginInput: UserLoginInput): Promise<UserLoginOutput> {
    return this.usersService.login(loginInput);
  }
}
