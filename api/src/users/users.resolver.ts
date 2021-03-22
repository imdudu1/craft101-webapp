import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Users)
  async me(@AuthUser() authUser: Users): Promise<Users> {
    return this.usersService.findUserById(authUser.id);
  }

  @Mutation(() => Users)
  async newAccount(@Args() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }
}
