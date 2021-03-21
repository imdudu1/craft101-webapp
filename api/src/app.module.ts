import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Articles } from './articles/entities/articles.entity';
import { Tags } from './articles/entities/tags.entity';
import { Categories } from './articles/entities/categories.entity';
import { Users } from './users/entities/users.entity';
import { OAuthTokens } from './auth/entities/oauth-tokens.entity';
import { AppController } from './app.controller';
import { AuthMiddleware } from './auth/auth.middleware';

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
      entities: [Articles, Tags, Categories, Users, OAuthTokens],
      synchronize: true,
      logging: 'all',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => {
        return {
          token: req ? req.headers['x-jwt'] : '',
        };
      },
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
