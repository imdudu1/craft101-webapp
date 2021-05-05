import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from 'src/files/services/files.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import LoginInput, { LoginOutput } from '../dtos/login-user.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  @Mutation(() => Users)
  async createUser(@Args() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Query(() => LoginOutput)
  async login(@Args() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => Boolean)
  @AllowUserRoles(['ADMIN'])
  async deleteUser(@Args('id') userId: number): Promise<boolean> {
    return this.usersService.deleteUser(userId);
  }

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async editUserAvatar(
    @AuthUser() authUser,
    @Args({ name: 'avatar', type: () => GraphQLUpload })
    { filename, createReadStream }: FileUpload,
  ): Promise<boolean> {
    const uploadedAvatar = await this.filesService.uploadFile(
      authUser,
      filename,
      createReadStream(),
    );
    await this.usersService.editUserAvatar(authUser, uploadedAvatar);
    return true;
  }

  @Query(() => Users)
  @AllowUserRoles(['ANY'])
  async me(@AuthUser() authUser: Users): Promise<Users> {
    return authUser;
  }
}
