import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('PaymentSource')
@Index('paymentSource_name_index', ['name'])
export class PaymentSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'tinyint', nullable: true })
  isActive: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
    comment: 'date this record was deleted',
  })
  deletedAt: Date;

  @Column({ type: 'int', nullable: true })
  posMediaId: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  posMediaDescription: string;
}
