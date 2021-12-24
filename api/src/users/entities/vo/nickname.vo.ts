import { Column } from 'typeorm';

export class Nickname {
  @Column()
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
