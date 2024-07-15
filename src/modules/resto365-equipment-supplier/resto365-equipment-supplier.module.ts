import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365EquipmentSupplierService } from './resto365-equipment-supplier.service';
import { Resto365EquipmentSupplierController } from './resto365-equipment-supplier.controller';
import { Resto365EquipmentSupplier } from './entities/resto365-equipment-supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365EquipmentSupplier], 'r365')],
  controllers: [Resto365EquipmentSupplierController],
  providers: [Resto365EquipmentSupplierService],
})
export class Resto365EquipmentSupplierModule {}
