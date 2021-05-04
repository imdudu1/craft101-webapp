import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from '../services/files.service';
import { Files } from '../entities/files.entity';

@Resolver()
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => Files)
  @AllowUserRoles(['ANY'])
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @AuthUser() authUser,
  ): Promise<Files> {
    console.log('file uploaded');
    return this.filesService.uploadFile(authUser, filename, createReadStream());
  }
}
