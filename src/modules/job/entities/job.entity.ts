import { JobStatus, JobType } from 'src/context';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  referenceId: string;

  @Column({
    name: 'jobType',
    type: 'enum',
    enum: JobType,
  })
  jobType: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus;

  @Column({ default: () => 'CURRENT_TIMESTAMP(6)' })
  scheduledAt: Date;

  @Column({ nullable: true })
  executionTime: Date;

  @Column({ nullable: true })
  completionTime: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @Column({ nullable: false })
  reasonForFailure: string;

  @Column({ nullable: false })
  deletedBy: number;

  @UpdateDateColumn({ nullable: false })
  deletedAt: Date;
}
