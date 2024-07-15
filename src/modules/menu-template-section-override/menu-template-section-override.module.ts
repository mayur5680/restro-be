import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuTemplateSectionOverride } from './entities/menu-template-section-override.entity';
import { MenuTemplateSectionOverrideService } from './menu-template-section-override.service';
import { MenuTemplateSectionOverrideController } from './menu-template-section-override.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTemplateSectionOverride])],
  providers: [MenuTemplateSectionOverrideService],
  controllers: [MenuTemplateSectionOverrideController],
  exports: [MenuTemplateSectionOverrideService],
})
export class MenuTemplateSectionOverrideModule {}
