// resto365-restaurant.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365RestaurantService } from './resto365-restaurant.service';
import { Resto365RestaurantController } from './resto365-restaurant.controller';
import { Resto365Restaurant } from './entities/resto365-restaurant.entity';
import { StoreModule } from '@modules/store/store.module';
import { TagModule } from '@modules/tag/tag.module';
import { StoreTagModule } from '@modules/store-tag/store-tag.module';
import { GroupStoreModule } from '@modules/group-store/group-store.module';
import { StoreChannelModule } from '@modules/store-channel/store-channel.module';
import { ChannelGroupStoreModule } from '@modules/channel-group-store/channel-group-store.module';
import { StoreOrderOffsetModule } from '@modules/store-order-offset/store-order-offset.module';
import { MenuTemplateSectionOverrideModule } from '@modules/menu-template-section-override/menu-template-section-override.module';
import { SectionModule } from '@modules/section/section.module';
import { MenuContainerOverrideModule } from '@modules/menu-container-override/menu-container-override.module';
import { MenuContainerModule } from '@modules/menu-container/menu-container.module';
import { Resto365NotificationModule } from '@modules/resto365-notification/resto365-notification.module';
import { Resto365JobModule } from '@modules/resto365-job/resto365-job.module';
import { ChannelGroupModule } from '@modules/channel-group/channel-group.module';
import { ChannelGroupMenuTemplateModule } from '@modules/channel-group-menu-template/channel-group-menu-template.module';
import { MenuTemplateModule } from '@modules/menu-template/menu-template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365Restaurant], 'r365'),
    StoreModule,
    TagModule,
    StoreTagModule,
    GroupStoreModule,
    StoreChannelModule,
    ChannelGroupStoreModule,
    StoreOrderOffsetModule,
    MenuTemplateSectionOverrideModule,
    SectionModule,
    MenuContainerOverrideModule,
    MenuContainerModule,
    Resto365NotificationModule,
    forwardRef(() => Resto365JobModule),
    ChannelGroupModule,
    ChannelGroupMenuTemplateModule,
    MenuTemplateModule,
  ],
  controllers: [Resto365RestaurantController],
  providers: [Resto365RestaurantService],
  exports: [Resto365RestaurantService],
})
export class Resto365RestaurantModule {}
