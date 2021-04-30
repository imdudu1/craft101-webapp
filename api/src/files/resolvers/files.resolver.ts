import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from '../services/files.service';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => Boolean)
  @AllowUserRoles(['ANY'])
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @AuthUser() authUser,
  ): Promise<boolean> {
    console.log('file uploaded');
    this.filesService.uploadFile(authUser, filename, createReadStream());
    return true;
  }
}
