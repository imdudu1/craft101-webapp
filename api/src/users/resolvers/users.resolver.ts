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
import { CreateUserDto } from '../dtos/create-user.dto';
import LoginInput, { LoginOutput } from '../dtos/login-user.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Mutation(() => Users)
  async createUser(@Args() createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.usersService.createUser(createUserDto);
    return user;
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

  @Query(() => Users)
  @AllowUserRoles(['ANY'])
  async me(@AuthUser() authUser: number): Promise<Users> {
    return this.usersService.findUser({ id: authUser });
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
