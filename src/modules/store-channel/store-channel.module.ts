import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreChannelService } from './store-channel.service';
import { StoreChannelController } from './store-channel.controller';
import { StoreChannel } from './entities/store-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreChannel])],
  controllers: [StoreChannelController],
  providers: [StoreChannelService],
  exports: [StoreChannelService],
})
export class StoreChannelModule {}
