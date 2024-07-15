import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  tagType: string;

  @Column({ type: 'tinyint', nullable: true })
  isActive: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'int', nullable: false })
  createdBy: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  value: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type: string;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deletedBy: string;
}
