import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './store.controller';
import { Store } from './entities/store.entity';
import { StoreService } from './store.service';
import { Resto365AuditModule } from '@modules/resto365-audit/resto365-audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), Resto365AuditModule],
  providers: [StoreService],
  controllers: [StoreController],
  exports: [StoreService],
})
export class StoreModule {}
