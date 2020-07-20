import { Entity, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Base from '@shared/infra/typeorm/entities/Base';
import uploadConfig from '@config/upload';

@Entity('users')
export default class Users extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  avatar: string;

  @Expose()
  getAvatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-1.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
