import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './entities/channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), Resto365RestaurantModule],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
