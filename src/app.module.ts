// app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm.config';
import { ConfigModule } from '@modules/config/config.module';
import { ConfigService } from '@modules/config/config.service';
import { UserModule } from '@modules/user/user.module';
import { LoyaltyHistoryModule } from '@modules/loyaltyHistory/loyaltyHistory.module';
import { UserIdentityModule } from '@modules/userIdentity/userIdentity.module';
import { LoyaltyModule } from '@modules/loyalty/loyalty.module';
import { StoreModule } from '@modules/store/store.module';
import { CheckoutModule } from '@modules/checkout/checkout.module';
import { UserExternalIdentityModule } from '@modules/userExternalIdentity/userExternalIdentity.module';
import { OrderModule } from '@modules/order/order.module';
import { OfferModule } from '@modules/offer/offer.module';
import { MerchandiseModule } from '@modules/merchandise/merchandise.module';
import { RewardModule } from '@modules/reward/reward.module';
import { OfferAttributeModule } from '@modules/offer-attribute/offer-attribute.module';
import { ProductModule } from '@modules/product/product.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { PaymentSourceModule } from '@modules/paymentSource/paymentSource.module';
import { BraintreeModule } from '@modules/braintree/braintree.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { MerchandiseInventoryModule } from './modules/merchandise-inventory/merchandise-inventory.module';
import { StoreSurchargeModule } from './modules/store-surcharge/store-surcharge.module';
import { HealthModule } from '@modules/health/health.module';
import { CouponModule } from '@modules/coupon/coupon.module';
import { TagModule } from '@modules/tag/tag.module';
import { StoreTagModule } from '@modules/store-tag/store-tag.module';
import { StoreOfferModule } from '@modules/store-offer/store-offer.module';
import { ChannelModule } from '@modules/channel/channel.module';
import { MenuTemplateModule } from '@modules/menu-template/menu-template.module';
import { ChannelGroupStoreModule } from '@modules/channel-group-store/channel-group-store.module';
import { GroupModule } from '@modules/group/group.module';
import { MenuContainerOverrideModule } from '@modules/menu-container-override/menu-container-override.module';
import { MenuContainerModule } from '@modules/menu-container/menu-container.module';
import { MenuTemplateSectionModule } from '@modules/menu-template-section/menu-template-section.module';
import { SectionModule } from '@modules/section/section.module';
import { MenuTemplateSectionOverrideModule } from '@modules/menu-template-section-override/menu-template-section-override.module';
import { MenuContainerProductModule } from '@modules/menu-container-product/menu-container-product.module';
import { MenuContainerProductOverrideModule } from '@modules/menu-container-product-override/menu-container-product-override.module';
import { StoreSectionTimeSlotModule } from '@modules/store-section-time-slot/store-section-time-slot.module';
import { ChannelGroupModule } from '@modules/channel-group/channel-group.module';
import { Resto365RestaurantModule } from '@modules/resto365-restaurant/resto365-restaurant.module';
import { ChannelGroupMenuTemplateModule } from '@modules/channel-group-menu-template/channel-group-menu-template.module';
import { StoreSectionTimeSlotOverrideModule } from '@modules/store-section-time-slot-override/store-section-time-slot-override.module';
import { StoreOrderOffsetOverrideModule } from '@modules/store-order-offset-override/store-order-offset-override.module';
import { StoreOrderOffsetModule } from '@modules/store-order-offset/store-order-offset.module';
import { UserDeviceModule } from '@modules/user-device/user-device.module';
import { OktaUserModule } from '@modules/okta-user/okta-user.module';
import { OfferMetaModule } from '@modules/offer-meta/offer-meta.module';
import { Resto365CountryModule } from '@modules/resto365-country/resto365-country.module';
import { Resto365AreaModule } from '@modules/resto365-area/resto365-area.module';
import { Resto365UserModule } from '@modules/resto365-user/resto365-user.module';
import { Resto365CerebroProductsModule } from '@modules/resto365-cerebro-products/resto365-cerebro-products.module';
import { Resto365RoleModule } from '@modules/resto365-role/resto365-role.module';
import { Resto365CerebroProductCompanyModule } from '@modules/resto365-cerebro-product-company/resto365-cerebro-product-company.module';
import { Resto365CerebroSyncModule } from '@modules/resto365-cerebro-sync/resto365-cerebro-sync.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthMiddleware } from '@modules/auth/auth.middleware';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthGuard } from '@modules/auth/AuthGuard';
import { GroupStoreModule } from '@modules/group-store/group-store.module';
import { Resto365AuditModule } from './modules/resto365-audit/resto365-audit.module';
import { AuditInterceptor } from '@modules/resto365-audit/audit.interceptor';
import { CorrelationIdInterceptor } from '@modules/resto365-audit/correlationId.interceptor';
import { AuditSubscriber } from '@modules/resto365-audit/subscribers/audit.subscriber';
import { StoreChannelModule } from './modules/store-channel/store-channel.module';
import { Resto365CerebroCategoryModule } from '@modules/resto365-cerebro-category/resto365-cerebro-category.module';
import { MenuTemplateSectionContainerModule } from './modules/menu-template-section-container/menu-template-section-container.module';
import { MenuContainerProductAttributeModule } from './modules/menu-container-product-attribute/menu-container-product-attribute.module';
import { MenuContainerAttributesModule } from './modules/menu-container-attributes/menu-container-attributes.module';
import { Resto365FaqModule } from './modules/resto365-faq/resto365-faq.module';
import { Resto365JobModule } from '@modules/resto365-job/resto365-job.module';
import { Resto365NotificationModule } from '@modules/resto365-notification/resto365-notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from '@modules/cronjobs/cronjobs.module';
import { JobModule } from './modules/job/job.module';
import { Resto365RestaurantLicenceModule } from './modules/resto365-restaurant-licence/resto365-restaurant-licence.module';
import { Resto365EquipmentModule } from './modules/resto365-equipment/resto365-equipment.module';
import { DataSource } from 'typeorm';
import { Resto365RestaurantTempModule } from './modules/resto365-restaurant-temp/resto365-restaurant-temp.module';
import { Resto365CerebroProductCompanyOverrideModule } from '@modules/resto365-cerebro-product-company-override/resto365-cerebro-product-company-override.module';
import { MenuGenerateModule } from '@modules/menu-generate/menu-generate.module';
import { Resto365EquipmentSupplierModule } from './modules/resto365-equipment-supplier/resto365-equipment-supplier.module';
import { Resto365EquipmentSupplierContactModule } from './modules/resto365-equipment-supplier-contact/resto365-equipment-supplier-contact.module';
import { Resto365EquipmentCategoryModule } from '@modules/resto365-equipment-category/resto365-equipment-category.module';
import { EventModule } from '@modules/event/event.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      name: 'default',
      inject: [ConfigService],

      useFactory: (configService: ConfigService) =>
        typeormConfig(configService).default,
    }),
    TypeOrmModule.forRootAsync({
      name: 'r365',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeormConfig(configService).r365,
    }),
    UserModule,
    LoyaltyHistoryModule,
    UserIdentityModule,
    LoyaltyModule,
    StoreModule,
    CheckoutModule,
    UserExternalIdentityModule,
    OrderModule,
    OfferModule,
    MerchandiseModule,
    RewardModule,
    OfferAttributeModule,
    ProductModule,
    PaymentModule,
    PaymentSourceModule,
    BraintreeModule,
    CustomerModule,
    MerchandiseInventoryModule,
    StoreSurchargeModule,
    HealthModule,
    CouponModule,
    StoreOfferModule,
    TagModule,
    StoreTagModule,
    ChannelModule,
    MenuTemplateModule,
    ChannelGroupStoreModule,
    GroupModule,
    MenuContainerOverrideModule,
    MenuContainerModule,
    MenuTemplateSectionModule,
    SectionModule,
    MenuTemplateSectionOverrideModule,
    MenuContainerProductModule,
    MenuContainerProductOverrideModule,
    StoreSectionTimeSlotModule,
    ChannelGroupModule,
    Resto365RestaurantModule,
    ChannelGroupMenuTemplateModule,
    StoreSectionTimeSlotOverrideModule,
    StoreOrderOffsetOverrideModule,
    StoreOrderOffsetModule,
    StoreSurchargeModule,
    UserDeviceModule,
    OktaUserModule,
    OfferMetaModule,
    Resto365CountryModule,
    Resto365AreaModule,
    Resto365RoleModule,
    Resto365UserModule,
    Resto365CerebroProductCompanyModule,
    Resto365CerebroProductsModule,
    Resto365CerebroSyncModule,
    HttpModule,
    AuthModule,
    GroupStoreModule,
    Resto365AuditModule,
    StoreChannelModule,
    Resto365CerebroCategoryModule,
    MenuTemplateSectionContainerModule,
    MenuContainerProductAttributeModule,
    MenuContainerAttributesModule,
    Resto365FaqModule,
    Resto365JobModule,
    Resto365NotificationModule,
    CronjobsModule,
    JobModule,
    Resto365RestaurantLicenceModule,
    Resto365EquipmentModule,
    Resto365RestaurantTempModule,
    Resto365CerebroProductCompanyOverrideModule,
    MenuGenerateModule,
    Resto365EquipmentSupplierModule,
    Resto365EquipmentSupplierContactModule,
    Resto365EquipmentCategoryModule,
    EventModule,
  ],
  controllers: [],
  providers: [
    AuditSubscriber,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    @InjectDataSource('r365') private readonly datasource: DataSource,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    /* 
      typeorm bug 
      the timezone parameter in typeorm datasource config is not honoured for mysql
      sets the timezone to UTC manually instead
      https://github.com/typeorm/typeorm/issues/5895
    */
    await this.datasource.manager.query("SET @@session.time_zone = '+00:00';");
  }
}
