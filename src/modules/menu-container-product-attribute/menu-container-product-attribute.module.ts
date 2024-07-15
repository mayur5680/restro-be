import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerProductAttributeService } from './menu-container-product-attribute.service';
import { MenuContainerProductAttributeController } from './menu-container-product-attribute.controller';
import { MenuContainerProductAttributes } from './entities/menu-container-product-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainerProductAttributes])],
  controllers: [MenuContainerProductAttributeController],
  providers: [MenuContainerProductAttributeService],
})
export class MenuContainerProductAttributeModule {}
