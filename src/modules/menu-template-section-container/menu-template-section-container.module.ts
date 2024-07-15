import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuTemplateSectionContainerService } from './menu-template-section-container.service';
import { MenuTemplateSectionContainerController } from './menu-template-section-container.controller';
import { MenuTemplateSectionContainer } from './entities/menu-template-section-container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTemplateSectionContainer])],
  controllers: [MenuTemplateSectionContainerController],
  providers: [MenuTemplateSectionContainerService],
})
export class MenuTemplateSectionContainerModule {}
