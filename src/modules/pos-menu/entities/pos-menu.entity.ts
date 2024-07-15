import { BhyveAuditEntity } from 'src/shared';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PosMenu')
export class PosMenu extends BhyveAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 250, nullable: true })
  description: string | null;

  @Column({ nullable: true })
  storeId: number | null;

  @Column({ nullable: true })
  tier: number | null;

  @Column({ length: 50, nullable: true })
  type: string | null;
}
