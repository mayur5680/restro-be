import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365EquipmentService } from './resto365-equipment.service';
import { Resto365EquipmentController } from './resto365-equipment.controller';
import { Resto365Equipment } from './entities/resto365-equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365Equipment], 'r365')],
  controllers: [Resto365EquipmentController],
  providers: [Resto365EquipmentService],
})
export class Resto365EquipmentModule {}
