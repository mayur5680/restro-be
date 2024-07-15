import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelGroupStore } from './entities/channel-group-store.entity';
import { ChannelGroupStoreService } from './channel-group-store.service';
import { ChannelGroupStoreController } from './channel-group-store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelGroupStore])],
  providers: [ChannelGroupStoreService],
  controllers: [ChannelGroupStoreController],
  exports: [ChannelGroupStoreService],
})
export class ChannelGroupStoreModule {}
