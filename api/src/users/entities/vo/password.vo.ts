import * as argon2 from 'argon2';
import { Column } from 'typeorm';

export class Password {
  @Column()
  readonly value: string;

  constructor(password: string) {
    this.value = password;
  }

  static async encrypt(password: string): Promise<Password> {
    return new Password(await this.argon2hash(password));
  }

  private static async argon2hash(s: string): Promise<string> {
    return argon2.hash(s);
  }

  isValid(password: string) {
    return argon2.verify(this.value, password);
  }

  equals(requestPassword: Password) {
    return this.value == requestPassword.value;
  }
}
