import { Module, forwardRef } from '@nestjs/common';
import { Resto365JobService } from './resto365-job.service';
import { Resto365JobController } from './resto365-job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resto365Job } from './entities/resto365-job.entity';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365Job], 'r365'),
    forwardRef(() => Resto365RestaurantModule),
  ],
  controllers: [Resto365JobController],
  providers: [Resto365JobService],
  exports: [Resto365JobService],
})
export class Resto365JobModule {}
