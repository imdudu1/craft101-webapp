import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { Articles } from './articles/entities/articles.entity';
import { Tags } from './articles/entities/tags.entity';
import { Categories } from './articles/entities/categories.entity';

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
      entities: [Article, Tag, Category],
      synchronize: true,
      logging: 'all',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
      sortSchema: true,
    }),
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
