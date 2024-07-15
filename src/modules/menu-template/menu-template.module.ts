import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuTemplateService } from './menu-template.service';
import { MenuTemplateController } from './menu-template.controller';
import { MenuTemplate } from './entities/menu-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTemplate])],
  providers: [MenuTemplateService],
  controllers: [MenuTemplateController],
  exports: [MenuTemplateService],
})
export class MenuTemplateModule {}
