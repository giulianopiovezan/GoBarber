import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Base from '@shared/infra/typeorm/entities/Base';

@Entity('appointments')
class Appointment extends Base {
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
