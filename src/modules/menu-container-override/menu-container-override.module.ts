import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerOverrideService } from './menu-container-override.service';
import { MenuContainerOverrideController } from './menu-container-override.controller';
import { MenuContainerOverride } from './entities/menu-container-override.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainerOverride])],
  providers: [MenuContainerOverrideService],
  controllers: [MenuContainerOverrideController],
  exports: [MenuContainerOverrideService],
})
export class MenuContainerOverrideModule {}
