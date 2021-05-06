import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ReadStream } from 'node:fs';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Files } from '../entities/files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
    private readonly configService: ConfigService,
  ) {}

  async uploadFile(
    uploader: number,
    filename: string,
    fileReadStream: ReadStream,
  ): Promise<Files> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: `${uuid()}-${filename}`,
        Body: fileReadStream,
      })
      .promise();
    const newFile = this.filesRepository.create({
      user: {
        id: uploader,
      },
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    return this.filesRepository.save(newFile);
  }
}
