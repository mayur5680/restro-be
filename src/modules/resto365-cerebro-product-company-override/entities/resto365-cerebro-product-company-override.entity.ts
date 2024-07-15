import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Resto365CerebroProductCompany } from '@modules/resto365-cerebro-product-company/entities/resto365-cerebro-product-company.entity';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { ProductStatus } from 'src/context';
import { Resto365AuditEntity } from 'src/shared';

@Entity('CerebroProductCompanyOverride')
@Index(
  'idx_restaurantId_productId',
  ['restaurantId', 'cerebroProductCompanyId'],
  { unique: true },
)
export class Resto365CerebroProductCompanyOverride extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  restaurantId: number;

  @Column({ nullable: true })
  cerebroProductCompanyId: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DISABLE })
  status: string;

  @ManyToOne(() => Resto365Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Resto365Restaurant;

  @ManyToOne(() => Resto365CerebroProductCompany)
  @JoinColumn({ name: 'cerebroProductCompanyId' })
  CerebroProductCompany: Resto365CerebroProductCompany;
}
