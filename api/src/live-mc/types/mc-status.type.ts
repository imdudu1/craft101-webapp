import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MCStatus {
  @Field(() => String)
  host: string;

  @Field(() => Number)
  port: number;

  @Field(() => String)
  version: string;

  @Field(() => Number)
  protocolVersion: number;

  @Field(() => Number)
  onlinePlayers: number;

  @Field(() => Number)
  maxPlayers: number;

  @Field(() => String)
  favicon: string;

  @Field(() => String)
  description: string;
}
