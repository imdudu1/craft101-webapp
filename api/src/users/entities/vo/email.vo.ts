import { Column } from 'typeorm';

export type EmailProps = {
  value: string;
  certifyEmail?: boolean;
};

export class Email {
  @Column({ length: 30 })
  private readonly value: string;

  @Column()
  private readonly certifyEmail: boolean;

  constructor(props: EmailProps) {
    /*
    const { email, certifyEmail } = { ...value };
    Email.validate(email);
    this.value = email;
    this.certifyEmail = certifyEmail || false;
     */
    const { value, certifyEmail = false } = { ...props };
    Object.assign(this, { value, certifyEmail });
  }

  private static validate(email: string) {
    if (!email?.includes('@') && !email?.includes('.')) {
      throw new Error('잘못된 형식의 메일입니다.');
    }
  }

  isCertifiedUser() {
    return this.certifyEmail;
  }

  equals(other: Email) {
    return this.value == other.value;
  }

  updateEmail(newEmail: Email) {
    const props: EmailProps = {
      value: newEmail.value,
      certifyEmail: this.certifyEmail && this.value == newEmail.value,
    };
    return new Email(props);
  }
}
