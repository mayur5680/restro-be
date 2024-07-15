import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';
import { Resto365AuditEntity } from 'src/shared';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CerebroCategory')
export class Resto365CerebroCategory extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'isActive', default: true })
  isActive: boolean;

  @Column({ name: 'countryId', nullable: false, default: 1 })
  countryId: number;

  @ManyToOne(() => Resto365Country)
  @JoinColumn({ name: 'countryId' })
  country: Resto365Country;
}
