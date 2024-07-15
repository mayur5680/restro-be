import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { UUID } from 'crypto';

export interface AuditLog {
  _metadata: {
    auditUser: Resto365User;
    correlationId: UUID;
  };
}

export interface AuditParams extends AuditLog {}
