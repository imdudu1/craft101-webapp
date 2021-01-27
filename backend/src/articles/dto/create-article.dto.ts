import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsString({ each: true })
  readonly tagList: string[];
}

export class CreateAdArticleDto extends CreateArticleDto {
  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly thumbnail: string;
}

export class CreateModArticleDto extends CreateArticleDto {
  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly supportVersions: string[];
}
