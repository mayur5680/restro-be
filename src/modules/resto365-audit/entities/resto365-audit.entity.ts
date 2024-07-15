import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditModule } from '../types';

export enum Origin {
  Api = 'Api',
  BhyveDB = 'Bhyve',
  Resto365DB = 'Resto365DB',
}

export enum EntitySource {
  Restaurant = 'Restaurant',
  RestaurantLicence = 'RestaurantLicence',
  User = 'User',
  Role = 'Role',
  Faq = 'Faq',
  Menu = 'Menu',
  Equipment = 'Equipment',
  StoreSectionTimeSlot = 'StoreSectionTimeSlot',
  GuestUser = 'GuestUser',
}

@Entity({ name: 'AuditLogs' })
export class Resto365Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Index()
  createdAt: Date;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  correlationId: UUID;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  roleId: number;

  @Column({ nullable: true })
  roleName: string;

  @Column()
  subject: string;

  @Column()
  action: string;

  @Column()
  origin: Origin;

  @Column({ nullable: true })
  entitySource: EntitySource;

  @Column({ nullable: true })
  entitySourceId: number;

  @Column({ nullable: true })
  module?: AuditModule;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  requestedValue?: object;

  @Column({
    type: 'json',
    nullable: true,
  })
  initialValue?: object;

  @Column({
    type: 'json',
    nullable: true,
  })
  updatedValue?: object;
}
