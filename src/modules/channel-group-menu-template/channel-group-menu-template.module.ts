import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelGroupMenuTemplateService } from './channel-group-menu-template.service';
import { ChannelGroupMenuTemplateController } from './channel-group-menu-template.controller';
import { ChannelGroupMenuTemplate } from './entities/channel-group-menu-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelGroupMenuTemplate])],
  controllers: [ChannelGroupMenuTemplateController],
  providers: [ChannelGroupMenuTemplateService],
  exports: [ChannelGroupMenuTemplateService],
})
export class ChannelGroupMenuTemplateModule {}
