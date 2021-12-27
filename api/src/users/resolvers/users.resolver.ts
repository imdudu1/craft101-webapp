import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from 'src/files/services/files.service';
import { ArticlesService } from '../../articles/services/articles/articles.service';
import { CommentsService } from '../../articles/services/comments/comments.service';
import { RecommendationsService } from '../../articles/services/recommendations/recommendations.service';
import { CreateUserRequest } from '../dtos/request/create-user.request';
import LoginInput, { LoginOutput } from '../dtos/request/login-user.request';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../dtos/response/user.response';

@Resolver(() => Users)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args() createUserDto: CreateUserRequest,
  ): Promise<UserResponse> {
    return new UserResponse(await this.usersService.createUser(createUserDto));
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
    @AuthUser() authUser: number,
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

  @Query(() => UserResponse)
  @AllowUserRoles(['ANY'])
  async me(@AuthUser() authUser: number): Promise<UserResponse> {
    return new UserResponse(await this.usersService.getUserById(authUser));
  }

  @ResolveField()
  async articles(@Parent() user: Users) {
    return this.articlesService.userArticle(user.id);
  }

  @ResolveField()
  async comments(@Parent() user: Users) {
    return this.commentsService.findUserComments(user.id);
  }

  @ResolveField()
  async files(@Parent() user: Users) {
    return this.filesService.userUploadFiles(user.id);
  }

  @ResolveField()
  async recommendations(@Parent() user: Users) {
    return this.recommendationsService.userRecommendationHistory(user.id);
  }
}
