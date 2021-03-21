import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users)
  async newAccount(@Args() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }
}
