import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { ArticlesModule } from './articles/articles.module';
import { Articles } from './articles/entities/articles.entity';
import { Categories } from './articles/entities/categories.entity';
import { PlayerHistories } from './articles/entities/player-histories.entity';
import { Tags } from './articles/entities/tags.entity';
import { AuthModule } from './auth/auth.module';
import { CertifyEmailCodes } from './auth/entities/certify-email-code.entity';
import { OAuthTokens } from './auth/entities/oauth-tokens.entity';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { LiveMCModule } from './live-mc/live-mc.module';
import { Users } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

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
      entities: [
        Articles,
        Tags,
        Categories,
        Users,
        OAuthTokens,
        CertifyEmailCodes,
        PlayerHistories,
      ],
      synchronize: true,
      logging: 'all',
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join('src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        return {
          token: req ? req.headers['x-jwt'] : '',
        };
      },
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
    LiveMCModule,
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
