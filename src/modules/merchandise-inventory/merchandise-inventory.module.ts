import { Module } from '@nestjs/common';
import { MerchandiseInventoryService } from './merchandise-inventory.service';
import { MerchandiseInventoryController } from './merchandise-inventory.controller';
import { MerchandiseInventory } from './entities/merchandise-inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MerchandiseInventory])],
  controllers: [MerchandiseInventoryController],
  providers: [MerchandiseInventoryService],
})
export class MerchandiseInventoryModule {}
