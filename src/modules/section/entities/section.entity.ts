import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Section')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentSectionId: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ type: 'tinyint', nullable: true })
  isCommonSection: number;

  @Column({ type: 'tinyint', nullable: true })
  isActive: number;

  @Column({
    default: 1,
    comment: 'DisplayOrder to support ordering at client side',
  })
  displayOrder: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @ManyToOne(() => Section, { nullable: true })
  @JoinColumn({ name: 'parentSectionId' })
  parentSection: Section;
}
