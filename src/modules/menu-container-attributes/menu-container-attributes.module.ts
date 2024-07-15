import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerAttributesService } from './menu-container-attributes.service';
import { MenuContainerAttributesController } from './menu-container-attributes.controller';
import { MenuContainerAttributes } from './entities/menu-container-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainerAttributes])],
  controllers: [MenuContainerAttributesController],
  providers: [MenuContainerAttributesService],
})
export class MenuContainerAttributesModule {}
