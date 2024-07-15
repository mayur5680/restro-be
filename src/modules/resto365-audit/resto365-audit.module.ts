import { Module } from '@nestjs/common';
import { Resto365AuditService } from './resto365-audit.service';
import { Resto365AuditController } from './resto365-audit.controller';
import { Resto365Audit } from './entities/resto365-audit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365Audit], 'r365')],
  controllers: [Resto365AuditController],
  providers: [Resto365AuditService],
  exports: [Resto365AuditService],
})
export class Resto365AuditModule {}
