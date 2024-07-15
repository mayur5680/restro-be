import { UUID } from 'crypto';
import { EntitySource, Origin } from '../entities/resto365-audit.entity';
import { AuditModule } from '../types';

export class CreateResto365AuditDto {
  userId: number;
  username: string;
  roleId: number;
  roleName: string;
  email: string;
  correlationId: UUID;
  subject: string;
  action: string;
  origin: Origin;
  entitySource?: EntitySource;
  entitySourceId?: number;
  requestedValue?: object;
  initialValue?: object;
  updatedValue?: object;
  module?: AuditModule;
  description?: string;
}
