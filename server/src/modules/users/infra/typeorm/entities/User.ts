import { Entity, Column } from 'typeorm';
import Base from '@shared/infra/typeorm/entities/Base';

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
}
