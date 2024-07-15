import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '@modules/user/user.entity';

@Index('user_device_user_id_index', ['userId'], {})
@Index('user_device_email_index', ['email'], {})
@Entity('UserDevice')
export class UserDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  deviceId: string;

  @Column({ nullable: true })
  deviceToken: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ default: false })
  oldDevice: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
