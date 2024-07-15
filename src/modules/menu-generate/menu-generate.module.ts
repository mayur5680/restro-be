import { Module } from '@nestjs/common';
import { MenuGenerateController } from './menu-generate.controller';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';
import { ChannelGroupStoreModule } from '@modules/channel-group-store/channel-group-store.module';
import { Resto365JobModule } from '@modules/resto365-job/resto365-job.module';

@Module({
  imports: [
    Resto365RestaurantModule,
    ChannelGroupStoreModule,
    Resto365JobModule,
  ],
  controllers: [MenuGenerateController],
  providers: [],
})
export class MenuGenerateModule {}
