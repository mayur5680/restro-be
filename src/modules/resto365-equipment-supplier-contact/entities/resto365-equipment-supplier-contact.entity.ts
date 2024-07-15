import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UUID } from 'crypto';
import { Resto365EquipmentSupplier } from '@modules/resto365-equipment-supplier/entities/resto365-equipment-supplier.entity';

export enum contactType {
  serviceContact = 'Service Contact',
  purchaseContact = 'Purchase Contact',
}

@Entity('RestaurantEquipmentSupplierContact')
@Unique(['name'])
@Index('idx_restaurant_equipment_supplier_contact_name', ['name'])
export class Resto365EquipmentSupplierContact
  extends Resto365AuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: contactType, nullable: false })
  contactType: contactType;

  @Column({ type: 'varchar', length: 20, nullable: false })
  contactNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contactEmail: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alternateContactNumber: string;

  @Column({ type: 'int', nullable: false })
  supplierId: number;

  @ManyToOne(() => Resto365EquipmentSupplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Resto365EquipmentSupplier;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
