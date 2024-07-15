import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from '@modules/group/entities/group.entity';
import { Channel } from '@modules/channel/entities/channel.entity';
import { Store } from '@modules/store/entities/store.entity';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';
import { MenuContainerProduct } from '@modules/menu-container-product/entities/menu-container-product.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

@Entity('MenuContainerProductOverride')
export class MenuContainerProductOverride implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => MenuTemplate)
  @JoinColumn({ name: 'menuTemplateId' })
  menuTemplate: MenuTemplate;

  @Column({ name: 'menuContainerProductPosPlu', nullable: true })
  menuContainerProductPosPlu: number;

  @Column({ name: 'parentMenuContainerProductPosPlu', nullable: true })
  parentMenuContainerProductPosPlu: number;

  @ManyToOne(() => MenuContainerProduct)
  @JoinColumn({ name: 'menuContainerProductId' })
  menuContainerProduct: MenuContainerProduct;

  @Column({ name: 'menuContainerPosPlu', nullable: true })
  menuContainerPosPlu: number;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ nullable: true })
  storeId: number;

  @Column({ nullable: true })
  posMenuId: number;

  @Column({ nullable: true })
  menuContainerProductId: number;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ length: 255, nullable: true })
  status: string;

  @Column({ length: 3, nullable: true })
  productType: string;

  @Column({ length: 1, nullable: true })
  partType: string;

  @Column({ length: 1, nullable: true })
  actionType: string;

  @Column({ length: 255, nullable: true })
  image: string;

  @Column({ length: 255, nullable: true })
  imageTop: string;

  @Column({ length: 255, nullable: true })
  imageAngle: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column()
  createdBy: number;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ length: 255, nullable: true })
  kilojoules: string;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
