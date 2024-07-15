import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resto365CerebroProductCompanyService } from './resto365-cerebro-product-company.service';
import { Resto365CerebroSyncModule } from '@modules/resto365-cerebro-sync/resto365-cerebro-sync.module';
import { Resto365CerebroProductsModule } from '@modules/resto365-cerebro-products/resto365-cerebro-products.module';
import { Resto365CerebroProductCompany } from './entities/resto365-cerebro-product-company.entity';
import { StoreModule } from '@modules/store/store.module';
import { ChannelGroupModule } from '@modules/channel-group/channel-group.module';
import { MenuContainerProductOverrideModule } from '@modules/menu-container-product-override/menu-container-product-override.module';
import { MenuContainerProductModule } from '@modules/menu-container-product/menu-container-product.module';
import { ChannelGroupStoreModule } from '@modules/channel-group-store/channel-group-store.module';
import { Resto365CerebroProductCompanyController } from './resto365-cerebro-product-company.controller';
import { Resto365CerebroLazyLoaderModule } from '@modules/resto365-cerebro-lazy-loader/resto365-cerebro-lazy-loader.module';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';
import { Resto365JobModule } from '@modules/resto365-job/resto365-job.module';
import { MenuContainerModule } from '@modules/menu-container/menu-container.module';
import { MenuContainerOverrideModule } from '@modules/menu-container-override/menu-container-override.module';
import { Resto365NotificationModule } from '@modules/resto365-notification/resto365-notification.module';
import { Resto365CerebroProductCompanyOverrideModule } from '@modules/resto365-cerebro-product-company-override/resto365-cerebro-product-company-override.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resto365CerebroProductCompany], 'r365'),
    Resto365CerebroProductsModule,
    Resto365CerebroSyncModule,
    StoreModule,
    ChannelGroupModule,
    MenuContainerProductModule,
    ChannelGroupStoreModule,
    MenuContainerProductOverrideModule,
    Resto365CerebroLazyLoaderModule,
    Resto365RestaurantModule,
    MenuContainerModule,
    MenuContainerOverrideModule,
    Resto365JobModule,
    Resto365NotificationModule,
    Resto365CerebroProductCompanyOverrideModule,
  ],

  controllers: [Resto365CerebroProductCompanyController],
  providers: [Resto365CerebroProductCompanyService],
})
export class Resto365CerebroProductCompanyModule {}
