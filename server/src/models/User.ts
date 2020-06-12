import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import Base from './Base';

@Entity('users')
export default class Users extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @BeforeInsert()
  async setHashedPassword(): Promise<void> {
    const hashedPassword = await hash(this.password, 8);
    this.password = hashedPassword;
  }

  public async isPasswordMatches(password: string): Promise<boolean> {
    const passwordMatched = await compare(password, this.password);
    return passwordMatched;
  }
}
