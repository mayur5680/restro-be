import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MenuContainer } from '@modules/menu-container/entities/menu-container.entity';
import { BhyveAuditEntity } from 'src/shared/audit.entity';
import { PosMenu } from '@modules/pos-menu/entities/pos-menu.entity';

@Entity('MenuContainerAttributes')
@Index(['menuContainerId', 'posMenuId'], { unique: true })
export class MenuContainerAttributes extends BhyveAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuContainerId: number;

  @Column()
  posMenuId: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  overridePrice: number;

  @ManyToOne(() => MenuContainer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuContainerId' })
  menuContainer: MenuContainer;

  @ManyToOne(() => PosMenu, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'posMenuId' })
  posMenu: PosMenu;
}
