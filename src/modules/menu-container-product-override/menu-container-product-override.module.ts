import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerProductOverrideService } from './menu-container-product-override.service';
import { MenuContainerProductOverrideController } from './menu-container-product-override.controller';
import { MenuContainerProductOverride } from './entities/menu-container-product-override.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainerProductOverride])],
  controllers: [MenuContainerProductOverrideController],
  providers: [MenuContainerProductOverrideService],
  exports: [MenuContainerProductOverrideService],
})
export class MenuContainerProductOverrideModule {}
