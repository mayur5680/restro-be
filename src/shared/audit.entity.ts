import {
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BhyveAuditEntity {
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
}

export abstract class Resto365AuditEntity extends BhyveAuditEntity {
  @VersionColumn()
  version?: number | string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ type: 'int', nullable: true })
  deletedBy?: number;
}
