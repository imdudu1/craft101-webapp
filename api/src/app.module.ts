import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ArticleModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
