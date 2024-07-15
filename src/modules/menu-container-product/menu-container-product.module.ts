import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerProductService } from './menu-container-product.service';
import { MenuContainerProductController } from './menu-container-product.controller';
import { MenuContainerProduct } from './entities/menu-container-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainerProduct])],
  controllers: [MenuContainerProductController],
  providers: [MenuContainerProductService],
  exports: [MenuContainerProductService],
})
export class MenuContainerProductModule {}
