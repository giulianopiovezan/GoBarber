import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Base from './Base';

import User from './User';

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
