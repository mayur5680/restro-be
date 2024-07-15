import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tag } from '@modules/tag/entities/tag.entity';
import { Store } from '@modules/store/entities/store.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

@Entity('StoreTag')
@Index('tagId_deletedAt_isActive_index', ['tagId', 'deletedAt', 'isActive'])
export class StoreTag implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  tagId: number;

  @Column({ nullable: true })
  isActive: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  _metadata: {
    auditUser: Resto365User;
    correlationId: `${string}-${string}-${string}-${string}-${string}`;
  };
}
