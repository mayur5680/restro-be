import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365CerebroProductsService } from './resto365-cerebro-products.service';
import { Resto365CerebroProductsController } from './resto365-cerebro-products.controller';

import { Resto365CerebroProduct } from './entities/resto365-cerebro-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365CerebroProduct], 'r365')],
  controllers: [Resto365CerebroProductsController],
  providers: [Resto365CerebroProductsService],
  exports: [Resto365CerebroProductsService],
})
export class Resto365CerebroProductsModule {}
