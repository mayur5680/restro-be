import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { JobStatus, JobType } from 'src/context';
import { Resto365AuditEntity } from 'src/shared';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Job')
@Index('restaurantId', ['restaurantId'])
@Index('jobId', ['jobId'])
export class Resto365Job extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'jobId' })
  jobId: number;

  @Column({ name: 'restaurantId' })
  restaurantId: number;

  @Column({ name: 'channelId' })
  channelId: number;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.CREATED,
  })
  status: string;

  @Column({ name: 'request' })
  request: string;

  @Column({
    name: 'jobType',
    type: 'enum',
    enum: JobType,
    default: JobType.MENU_GENERATION,
  })
  jobType: string;

  @ManyToOne(() => Resto365Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Resto365Restaurant;
}
