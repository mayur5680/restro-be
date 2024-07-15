import { Resto365CerebroCategory } from '@modules/resto365-cerebro-category/entities/resto365-cerebro-category.entity';
import { Resto365CerebroProduct } from '@modules/resto365-cerebro-products/entities/resto365-cerebro-product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';
import { Resto365CerebroProductCompanyOverride } from '@modules/resto365-cerebro-product-company-override/entities/resto365-cerebro-product-company-override.entity';
import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';

@Entity('CerebroProductCompany')
export class Resto365CerebroProductCompany
  extends Resto365AuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'productId', unique: true })
  productId: number;

  @Column({ name: 'productName' })
  productName: string;

  @Column({
    name: 'productNameNumber',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  productNameNumber: string;

  @Column({ name: 'categoryPK' })
  categoryPk: number;

  @Column({ name: 'categoryId', nullable: true })
  categoryId: number;

  @Column({ name: 'countryId', nullable: false, default: 1 })
  countryId: number;

  @ManyToOne(() => Resto365Country)
  @JoinColumn({ name: 'countryId' })
  country: Resto365Country;

  @OneToMany(
    () => Resto365CerebroProduct,
    (resto365CerebroProduct) =>
      resto365CerebroProduct.resto365CerebroProductCompany,
  )
  @JoinColumn({
    name: 'productNameNumber',
    referencedColumnName: 'productCompanyNameNumber',
  })
  public resto365CerebroProduct?: Resto365CerebroProduct[];

  @ManyToOne(
    () => Resto365CerebroCategory,
    (resto365CerebroCategory) => resto365CerebroCategory.id,
  )
  @JoinColumn({
    name: 'categoryId',
  })
  resto365CerebroCategory?: Resto365CerebroCategory;

  @OneToMany(
    () => Resto365CerebroProductCompanyOverride,
    (resto365CerebroProductCompanyOverride) =>
      resto365CerebroProductCompanyOverride.CerebroProductCompany,
  )
  public resto365CerebroProductCompanyOverride?: Resto365CerebroProductCompanyOverride[];

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
