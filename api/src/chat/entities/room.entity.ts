import { CommonEntity } from '../../common/entities/common.entity';
import { Entity, OneToMany } from 'typeorm';
import { Messages } from './message.entity';

@Entity()
export class Rooms extends CommonEntity {
  @OneToMany(() => Messages, (message) => message.room)
  messages: Messages[];
}
