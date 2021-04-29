import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowUserRoles } from 'src/auth/decorators/allow-user-role.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { FilesService } from '../services/files.service';

@Controller('files')
@AllowUserRoles(['ANY'])
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @AllowUserRoles(['ANY'])
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @Req() request,
    @AuthUser() authUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(authUser);
    return this.filesService.uploadFile(
      authUser,
      file.originalname,
      file.buffer,
    );
  }
}
