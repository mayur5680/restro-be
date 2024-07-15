import { User } from '@modules/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('UserIdentity')
@Index('userId', ['userId'])
export class UserIdentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, comment: 'BHYVE User ID' })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  identityUsername: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  isEnabled: boolean;

  @Column({
    type: 'enum',
    enum: ['Password', 'Facebook', 'Google', 'Apple'],
    default: 'Password',
    nullable: false,
  })
  identityProvider: 'Password' | 'Facebook' | 'Google' | 'Apple';

  @Column({ type: 'tinyint', default: 0 })
  isEmailVerified: boolean;

  @Column({ type: 'tinyint', default: 0 })
  isPhoneVerified: boolean;

  @Column({ type: 'varchar', length: 255 })
  accountStatus: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    comment: 'last known ip used by user to login with this identity',
  })
  lastKnownIp: string;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
    comment: 'last known date when this identity was used to login',
  })
  lastLoginDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  updatedBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
