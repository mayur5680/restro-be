import { Module } from '@nestjs/common';
import { Resto365EquipmentCategoryService } from './resto365-equipment-category.service';
import { Resto365EquipmentCategoryController } from './resto365-equipment-category.controller';
import { Resto365EquipmentCategory } from './entities/resto365-equipment-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365EquipmentCategory], 'r365')],
  controllers: [Resto365EquipmentCategoryController],
  providers: [Resto365EquipmentCategoryService],
  exports: [Resto365EquipmentCategoryService],
})
export class Resto365EquipmentCategoryModule {}
