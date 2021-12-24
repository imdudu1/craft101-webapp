import { Column } from 'typeorm';

export class Username {
  @Column()
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
