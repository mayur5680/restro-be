import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationCategory } from '../resto365-notification.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

@Entity('Notification')
export class Resto365Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  category: NotificationCategory;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => Resto365User)
  @JoinColumn({ name: 'userId' })
  user: Resto365User;
}
