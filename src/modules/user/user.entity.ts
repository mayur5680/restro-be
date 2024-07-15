import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Loyalty } from '@modules/loyalty/loyalty.entity';
import { UserIdentity } from '@modules/userIdentity/userIdentity.entity';
import { UserExternalIdentity } from '@modules/userExternalIdentity/userExternalIdentity.entity';

export enum Identity {
  Password = 'Password',
  Facebook = 'Facebook',
  Google = 'Google',
  Apple = 'Apple',
}

@Entity('User')
@Unique('userEmail_unique_index', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mobile: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: 'score given for the password strength',
  })
  passwordScore: number;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
    comment: 'flag user account which has weak password',
  })
  weakPassword: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postcode: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  countryCode: string;

  @Column({ type: 'datetime', nullable: true })
  dateofbirth: Date;

  @Column({ type: 'tinyint', nullable: true })
  isVerifiedMobile: boolean;

  @Column({ type: 'tinyint', nullable: true })
  isVerifiedEmail: boolean;

  @Column({ type: 'tinyint', nullable: true })
  receiveEmails: boolean;

  @Column({ type: 'tinyint', default: 1, nullable: true })
  isActive: boolean;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
    comment: 'define if test user or real user',
  })
  isTest: boolean;

  @Column({ type: 'tinyint', nullable: true })
  isMigrated: boolean;

  @Column({ type: 'tinyint', default: 0, nullable: false })
  isMobileOwner: boolean;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: false,
    comment:
      'Whether use is created in braintree. not braintree customerId is same as userId',
  })
  createdInBraintree: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  favouriteRestaurant: string;

  @Column({
    type: 'enum',
    enum: ['Password', 'Facebook', 'Google', 'Apple'],
    default: 'Password',
    nullable: false,
  })
  recentIdentity: Identity;

  @Column({ type: 'tinyint', default: 1, nullable: true })
  isExistingAccount: boolean;

  @Column({ type: 'timestamp', nullable: true })
  loggedInAt: Date;

  @Column({ type: 'tinyint', default: 0, nullable: true })
  isBlocked: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  blockedReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int', nullable: true })
  createdBy: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  dateUserCreated: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  braintreeCustomerId: string;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
    comment: 'whether user opted for store credit card or not',
  })
  storeCard: boolean;

  @OneToMany(() => Loyalty, (loyalty) => loyalty.user, { eager: false })
  loyalties: Loyalty[];

  @OneToMany(() => UserIdentity, (userIdentity) => userIdentity.user, {
    eager: false,
  })
  userIdentities: UserIdentity[];

  @OneToMany(
    () => UserExternalIdentity,
    (userExternalIdentity) => userExternalIdentity.user,
    {
      eager: false,
    },
  )
  userExternalIdentities: UserExternalIdentity[];
}
