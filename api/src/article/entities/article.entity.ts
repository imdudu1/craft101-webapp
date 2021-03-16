import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  explanation: string;

  @Field(() => [String])
  tags: string[];
}
