import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MenuContainerProduct } from '@modules/menu-container-product/entities/menu-container-product.entity';
import { PosMenu } from '@modules/pos-menu/entities/pos-menu.entity';

@Entity('MenuContainerProductAttributes')
@Index(['menuContainerProductId', 'posMenuId'])
export class MenuContainerProductAttributes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuContainerProductId: number;

  @Column()
  posMenuId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  overridePrice: number | null;

  @ManyToOne(() => MenuContainerProduct)
  @JoinColumn({ name: 'menuContainerProductId' })
  menuContainerProduct: MenuContainerProduct;

  @ManyToOne(() => PosMenu)
  @JoinColumn({ name: 'posMenuId' })
  posMenu: PosMenu;
}
