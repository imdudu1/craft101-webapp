import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
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

  async uploadFile(filename: string, fileBuffer: Buffer) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: fileBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    const newFile = this.filesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    return this.filesRepository.save(newFile);
  }
}
