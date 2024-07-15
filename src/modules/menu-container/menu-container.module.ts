import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuContainerService } from './menu-container.service';
import { MenuContainerController } from './menu-container.controller';
import { MenuContainer } from './entities/menu-container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuContainer])],
  providers: [MenuContainerService],
  controllers: [MenuContainerController],
  exports: [MenuContainerService],
})
export class MenuContainerModule {}
