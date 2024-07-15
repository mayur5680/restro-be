import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelGroupService } from './channel-group.service';
import { ChannelGroupController } from './channel-group.controller';
import { ChannelGroup } from './entities/channel-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelGroup])],
  controllers: [ChannelGroupController],
  providers: [ChannelGroupService],
  exports: [ChannelGroupService],
})
export class ChannelGroupModule {}
