// Import necessary modules from TypeORM
import { Resto365CerebroProductCompany } from '@modules/resto365-cerebro-product-company/entities/resto365-cerebro-product-company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';

// Define the CerebroProduct entity
@Entity('CerebroProduct')
export class Resto365CerebroProduct extends Resto365AuditEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'productMappingPk',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  productMappingPk: string;

  @Column({
    name: 'recipePlu',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  recipePlu: string;

  @Column({
    name: 'posPLU',
    type: 'int',
  })
  posPLU: number;

  @Column({
    name: 'posProductName',
    type: 'varchar',
    length: 255,
  })
  posProductName: string;

  @Column({
    name: 'recipeName',
    type: 'varchar',
    length: 255,
  })
  recipeName: string;

  @Column({
    name: 'ingredientName',
    type: 'varchar',
    length: 255,
  })
  ingredientName: string;

  @Column({
    name: 'componentSequence',
    type: 'int',
  })
  componentSequence: number;

  @Column({
    name: 'recipeQty',
    type: 'int',
  })
  recipeQty: number;

  @Column({
    name: 'productCompanyNameNumber',
    type: 'varchar',
    length: 255,
  })
  productCompanyNameNumber: string;

  @Column({
    name: 'portion',
    type: 'varchar',
    length: 100,
  })
  portion: string;

  @Column({
    name: 'recipeCategory',
    type: 'varchar',
    length: 255,
  })
  recipeCategory: string;

  @Column({ name: 'LAST_TOUCH_DATE', type: 'datetime' })
  lastTouchDate: Date;

  @Column({ name: 'countryId', nullable: false, default: 1 })
  countryId: number;

  @ManyToOne(() => Resto365Country)
  @JoinColumn({ name: 'countryId' })
  country: Resto365Country;

  // Define relationships
  @ManyToOne(
    () => Resto365CerebroProductCompany,
    (resto365CerebroProductCompany) =>
      resto365CerebroProductCompany.productNameNumber,
  )
  @JoinColumn({
    name: 'productCompanyNameNumber',
    referencedColumnName: 'productNameNumber',
  })
  resto365CerebroProductCompany?: Resto365CerebroProductCompany;
}
