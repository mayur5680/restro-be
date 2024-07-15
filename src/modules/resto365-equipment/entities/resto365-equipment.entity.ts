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
import { UUID } from 'crypto';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { Resto365EquipmentSupplier } from '@modules/resto365-equipment-supplier/entities/resto365-equipment-supplier.entity';
import { Resto365EquipmentCategory } from '@modules/resto365-equipment-category/entities/resto365-equipment-category.entity';

export enum Brand {
  HennyPenny = 'Henny Penny',
  Taylor = 'Taylor',
  Woodson = 'Woodson',
  Culinaire = 'Culinaire',
  Adande = 'Adande',
  Stoddart = 'Stoddart',
  Electrolux = 'Electrolux',
  Rinnai = 'Rinnai',
  Hoshizaki = 'Hoshizaki',
  Sirman = 'Sirman',
  Waring = 'Waring',
  Rhino = 'Rhino',
  Enware = 'Enware',
  ThreeMonkeez = '3 Monkeez',
  Williams = 'Williams',
  Skope_Reflex = 'Skope / Reflex',
  Meiko = 'Meiko',
  Anliker = 'Anliker',
  Tounus = 'Tounus',
  Bunnic = 'Bunnic',
  Prince_Castle = 'Prince Castle',
  SPM = 'SPM',
  Franke = 'Franke',
}

export enum Warranty {
  None = 'None',
  OneYear = '1 Year',
  TwoYears = '2 Years',
  ThreeYears = '3 Years',
  FourYears = '4 Years',
  FiveYears = '5 Years',
  SixYears = '6 Years',
  SevenYears = '7 Years',
  EightYears = '8 Years',
  NineYears = '9 Years',
  TenYears = '10 Years',
}

@Entity('RestaurantEquipment')
@Index(['id', 'equipmentCategoryId', 'equipment', 'brand'])
export class Resto365Equipment extends Resto365AuditEntity implements AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  equipment: string;

  @Column({ type: 'int', nullable: false })
  supplierId: number;

  @Column({ type: 'enum', enum: Brand, nullable: false })
  brand: Brand;

  @Column({ type: 'varchar', length: 255, nullable: true })
  model: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'enum', enum: Warranty, nullable: true })
  warranty: Warranty;

  @Column({ type: 'date', nullable: false })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true })
  lastServiceDate: Date;

  @Column({ type: 'date', nullable: true })
  nextServiceDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  servicePeriod: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'int', nullable: false })
  restaurantId: number;

  @Column({ type: 'int', nullable: true })
  equipmentCategoryId: number;

  @ManyToOne(() => Resto365EquipmentCategory)
  @JoinColumn({ name: 'equipmentCategoryId' })
  equipmentCategory?: Resto365EquipmentCategory;

  @ManyToOne(() => Resto365Restaurant)
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Resto365Restaurant;

  @ManyToOne(() => Resto365EquipmentSupplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Resto365EquipmentSupplier;

  _metadata: { auditUser: Resto365User; correlationId: UUID };
}
