import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('customerEmail_unique_index', ['email'])
export class Customer {
  @PrimaryColumn()
  id: string;

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
  gender: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  postcode: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  countryCode: string;

  @Column({ type: 'datetime', nullable: true })
  dateofbirth: Date | string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @CreateDateColumn()
  createdAt: Date | string;

  @Column()
  createdBy: number;

  @UpdateDateColumn()
  updatedAt: Date | string;

  @Column({ nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  dateUserCreated: Date | string;
}
