import { Resto365AuditEntity } from 'src/shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RestaurantEquipmentCategory')
export class Resto365EquipmentCategory extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;
}
