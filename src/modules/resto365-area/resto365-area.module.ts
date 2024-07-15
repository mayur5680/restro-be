import { Module } from '@nestjs/common';
import { Resto365AreaService } from './resto365-area.service';
import { Resto365AreaController } from './resto365-area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365Area } from './entities/resto365-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto365Area], 'r365')],
  controllers: [Resto365AreaController],
  providers: [Resto365AreaService],
  exports: [Resto365AreaService],
})
export class Resto365AreaModule {}
