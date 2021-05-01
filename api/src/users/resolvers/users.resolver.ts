import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from 'src/files/services/files.service';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import LoginUserDto from '../dtos/login-user.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly filesService: FilesService,
  ) {}

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

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async addAvatar(
    @AuthUser() authUser,
    @Args({ name: 'avatar', type: () => GraphQLUpload })
    { filename, createReadStream }: FileUpload,
  ): Promise<boolean> {
    const uploadedAvatar = await this.filesService.uploadFile(
      authUser,
      filename,
      createReadStream(),
    );
    await this.usersService.updateUserAvatar(authUser, uploadedAvatar);
    return true;
  }

  @Query(() => Users)
  @AllowUserRoles(['ANY'])
  async me(@AuthUser() authUser: Users): Promise<Users> {
    return authUser;
  }
}
