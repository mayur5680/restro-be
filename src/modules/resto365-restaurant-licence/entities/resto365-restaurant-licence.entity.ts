import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { UUID } from 'crypto';

export enum LicenceType {
  LiquorLicense = 'Liquor License',
  FoodSafetyLicense = 'Food Safety License',
  CouncilLicense = 'Council License',
}

@Entity('RestaurantLicence')
@Index(['licenceNumber'], { unique: true })
@Index(['restaurantId'])
export class Resto365RestaurantLicence
  extends Resto365AuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  licenceName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  licenceNumber: string;

  @Column({ type: 'date', nullable: false })
  issueDate: Date;

  @Column({ type: 'date', nullable: false })
  expiryDate: Date;

  @Column({ type: 'int', nullable: false })
  renewalNoticePeriodInDays: number;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'int', nullable: false })
  restaurantId: number;

  @ManyToOne(() => Resto365Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Resto365Restaurant;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
