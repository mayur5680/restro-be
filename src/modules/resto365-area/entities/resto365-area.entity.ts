import { Resto365AuditEntity } from 'src/shared/audit.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Resto365Country } from '@modules/resto365-country/entities/resto365-country.entity';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';

@Entity({ name: 'Area' })
export class Resto365Area extends Resto365AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  shortName: string;

  @Column({ nullable: false })
  countryId: number;

  @Column({ nullable: true })
  timeZone: string;

  @ManyToOne(() => Resto365Country)
  @JoinColumn({ name: 'countryId' })
  country: Resto365Country;

  @OneToMany(() => Resto365Restaurant, (restaurant) => restaurant.area)
  restaurants: Resto365Restaurant[];
}
