import { Field, ObjectType } from '@nestjs/graphql';
import { MCStatus } from '../types/mc-status.type';
import { CommonOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class McStatusOutputDto extends CommonOutput {
  @Field(() => MCStatus)
  status?: MCStatus;
}
