import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { Article } from './article/entities/article.entity';
import { Tag } from './article/entities/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Article, Tag],
      synchronize: true,
      logging: 'all',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
      sortSchema: true,
    }),
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
