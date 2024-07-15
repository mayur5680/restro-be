// Import necessary modules from TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define the ProductCompany entity
@Entity('ProductCompany')
export class CerebroProductCompany {
  @PrimaryGeneratedColumn({ name: 'PRODUCT_ID' })
  productId: number;

  @Column({ name: 'PRODUCT_NAME', length: 250, nullable: false })
  productName: string;

  @Column({ name: 'PRODUCT_NAME_NUMBER', length: 250, nullable: false })
  productNameNumber: string;

  @Column({ name: 'CATEGORY_PK', type: 'int' })
  categoryPK: number;

  @Column({ name: 'LAST_TOUCH_DATE', type: 'datetime' })
  lastTouchDate: Date;
}
