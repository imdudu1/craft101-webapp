import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { UserLoginInput, UserLoginOutput } from './dtos/login-user.dto';
import { UpdateUserInput } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { SelectRowInput } from '../common/dtos/select-row.dto';
import { Role } from '../auth/role.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserLoginOutput)
  login(@Args('form') loginInput: UserLoginInput): Promise<UserLoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => CreateUserOutput)
  createUser(
    @Args('form') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => UserProfileOutput)
  @Role(['Any'])
  me(@AuthUser() authUser): UserProfileOutput {
    return authUser;
  }

  @Query(() => UserProfileOutput)
  @Role(['Any'])
  userProfile(@Args() { id }: SelectRowInput): Promise<UserProfileOutput> {
    return this.usersService.findById(id);
  }

  @Mutation(() => Boolean)
  @Role(['Any'])
  updateUser(@Args('form') updateUserDto: UpdateUserInput): Promise<boolean> {
    return this.usersService.update(updateUserDto);
  }

  @Mutation(() => Boolean)
  @Role(['Any'])
  deleteUser(@Args() { id }: SelectRowInput): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
