import { Module } from '@nestjs/common';
import { Resto365CerebroCategoryService } from './resto365-cerebro-category.service';
import { Resto365CerebroCategoryController } from './resto365-cerebro-category.controller';

@Module({
  controllers: [Resto365CerebroCategoryController],
  providers: [Resto365CerebroCategoryService],
})
export class Resto365CerebroCategoryModule {}
