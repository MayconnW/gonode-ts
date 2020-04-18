import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Appointment from './Appointment';
import Storage from './Storage';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Appointment, appointment => appointment.provider)
  @JoinColumn({ name: 'provider_id' })
  appointments: Appointment[];

  @Column()
  avatar_id: string;

  @OneToOne(() => Storage)
  @JoinColumn({ name: 'avatar_id' })
  avatar: Storage;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
