import { Resto365AuditEntity } from 'src/shared/audit.entity';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('CerebroSync')
export class Resto365CerebroSync extends Resto365AuditEntity {
  @PrimaryColumn({ name: 'name' })
  name: string;

  @CreateDateColumn({
    name: 'syncDate',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  syncDate: Date;
}
