import { PartialType } from '@nestjs/swagger';
import { CreateResto365AuditDto } from './create-resto365-audit.dto';

export class UpdateResto365AuditDto extends PartialType(
  CreateResto365AuditDto,
) {}
