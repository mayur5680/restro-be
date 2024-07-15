import { Module } from '@nestjs/common';
import { StoreSurchargeService } from './store-surcharge.service';
import { StoreSurchargeController } from './store-surcharge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreSurcharge } from './entities/store-surcharge.entity';
import { Store } from '@modules/store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreSurcharge, Store])],
  controllers: [StoreSurchargeController],
  providers: [StoreSurchargeService],
})
export class StoreSurchargeModule {}
