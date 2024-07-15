import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Merchandise')
export class Merchandise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'tinyint', nullable: false })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageTop: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageAngle: string;

  @Column({ type: 'int', nullable: false })
  posPlu: number;

  @Column({ type: 'tinyint', nullable: false })
  needInventoryValidation: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
