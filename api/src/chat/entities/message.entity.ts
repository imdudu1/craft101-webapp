import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Rooms } from './room.entity';

@Entity()
export class Messages extends CommonEntity {
  @Column()
  content: string;

  @ManyToOne(() => Rooms, (room) => room.messages)
  room: Rooms;
}
