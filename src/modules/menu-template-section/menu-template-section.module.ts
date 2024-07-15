import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuTemplateSectionService } from './menu-template-section.service';
import { MenuTemplateSectionController } from './menu-template-section.controller';
import { MenuTemplateSection } from './entities/menu-template-section.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MenuTemplateSection])],
  controllers: [MenuTemplateSectionController],
  providers: [MenuTemplateSectionService],
})
export class MenuTemplateSectionModule {}
