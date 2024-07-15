import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365EquipmentSupplierContactService } from './resto365-equipment-supplier-contact.service';
import { Resto365EquipmentSupplierContactController } from './resto365-equipment-supplier-contact.controller';
import { Resto365EquipmentSupplierContact } from './entities/resto365-equipment-supplier-contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365EquipmentSupplierContact], 'r365'),
  ],
  controllers: [Resto365EquipmentSupplierContactController],
  providers: [Resto365EquipmentSupplierContactService],
})
export class Resto365EquipmentSupplierContactModule {}
