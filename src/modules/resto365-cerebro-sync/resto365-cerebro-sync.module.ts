import { Module } from '@nestjs/common';
import { Resto365CerebroSyncService } from './resto365-cerebro-sync.service';
import { Resto365CerebroSyncController } from './resto365-cerebro-sync.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365CerebroSync } from './entities/resto365-cerebro-sync.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365CerebroSync], 'r365')],
  controllers: [Resto365CerebroSyncController],
  providers: [Resto365CerebroSyncService],
  exports: [Resto365CerebroSyncService],
})
export class Resto365CerebroSyncModule {}
