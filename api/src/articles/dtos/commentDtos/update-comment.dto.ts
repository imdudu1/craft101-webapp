import { InputType, PickType } from '@nestjs/graphql';
import { Comments } from 'src/articles/entities/comments.entity';

@InputType()
export class UpdateCommentDto extends PickType(Comments, ['content']) {}
