import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosMenuService } from './pos-menu.service';
import { PosMenuController } from './pos-menu.controller';
import { PosMenu } from './entities/pos-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PosMenu])],
  controllers: [PosMenuController],
  providers: [PosMenuService],
})
export class PosMenuModule {}
