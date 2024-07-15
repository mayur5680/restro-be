import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { AuditLog } from 'src/shared/audit-logs.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Index,
  OneToMany,
} from 'typeorm';
import { UUID } from 'crypto';
import { Resto365EquipmentSupplierContact } from '@modules/resto365-equipment-supplier-contact/entities/resto365-equipment-supplier-contact.entity';

@Entity('RestaurantEquipmentSupplier')
@Unique(['name'])
@Index('idx_restaurant_equipment_supplier_name', ['name'])
export class Resto365EquipmentSupplier
  extends Resto365AuditEntity
  implements AuditLog
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(
    () => Resto365EquipmentSupplierContact,
    (contact) => contact.supplier,
  )
  contacts: Resto365EquipmentSupplierContact[];

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
