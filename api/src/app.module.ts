import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticlesModule } from './articles/articles.module';
import { Articles } from './articles/entities/articles.entity';
import { Categories } from './articles/entities/categories.entity';
import { Comments } from './articles/entities/comments.entity';
import { Recommendations } from './articles/entities/recommendations.entity';
import { Tags } from './articles/entities/tags.entity';
import { AuthModule } from './auth/auth.module';
import { CertifyEmailCodes } from './auth/entities/certify-email-code.entity';
import { OAuthTokens } from './auth/entities/oauth-tokens.entity';
import { JWT_KEY_NAME } from './constants';
import { Files } from './files/entities/files.entity';
import { FilesModule } from './files/files.module';
import { PlayerHistories } from './live-mc/entities/player-histories.entity';
import { LiveMCModule } from './live-mc/live-mc.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { Users } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { Messages } from './chat/entities/message.entity';
import { Rooms } from './chat/entities/room.entity';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        GRAPHQL_PLAYGROUND: Joi.boolean(),
        MYSQL_DB: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        KAKAO_API_KEY: Joi.string().required(),
        KAKAO_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: ({ req, connection }) => {
          return {
            token: req
              ? req.headers[JWT_KEY_NAME]
              : connection.context[JWT_KEY_NAME],
          };
        },
        installSubscriptionHandlers: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DB'),
        synchronize: true,
        logging: 'all',
        entities: [
          Articles,
          Tags,
          Categories,
          Users,
          OAuthTokens,
          CertifyEmailCodes,
          PlayerHistories,
          Comments,
          Recommendations,
          Files,
          Messages,
          Rooms,
        ],
      }),
    }),
    ScheduleModule.forRoot(),
    ArticlesModule,
    UsersModule,
    AuthModule,
    LiveMCModule,
    PubSubModule,
    FilesModule,
    ChatModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
