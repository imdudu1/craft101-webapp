import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonOutput {
  @Field(_type => Number)
  code: number;

  @Field(_type => String, { nullable: true })
  message?: string;
}
