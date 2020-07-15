import { Entity, Column, Generated } from 'typeorm';
import Base from '@shared/infra/typeorm/entities/Base';

@Entity('user_tokens')
export default class UserTokens extends Base {
  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;
}
