import { ChannelGroupStoreService } from '@modules/channel-group-store/channel-group-store.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { GygLog, exceptionWrapper } from 'src/shared';
import { Acl } from '@modules/auth/AclDecorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AclGuard } from '@modules/auth/AclGuard';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { generateMenu } from 'src/shared/service';

@Controller('menu-generate')
export class MenuGenerateController {
  logger: GygLog;
  constructor(
    private readonly resto365RestaurantService: Resto365RestaurantService,
    private readonly channelGroupStoreService: ChannelGroupStoreService,
    private readonly resto365JobService: Resto365JobService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new GygLog(MenuGenerateController.name);
  }

  @Get('store/:storeId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: `Generate Menu by storeId` })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async generateMenuByStoreId(
    @Param('storeId') storeId: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: string,
  ) {
    const actionName = 'Generate Menu by storeId';
    try {
      this.logger.writeLog(actionName, storeId, correlationId);

      const restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);

      //* get bhyve storeId
      const bhyveId = Number(restaurant.bhyveId);

      //get ChannelGroupStores
      const channelGroupStores =
        await this.channelGroupStoreService.findAllByStoreId(bhyveId);

      this.logger.writeLog(
        actionName,
        `channelGroupStores - ${channelGroupStores.length}`,
        correlationId,
      );

      //* generate menu
      await generateMenu(
        channelGroupStores,
        restaurant,
        this.configService.bhyveConfig.bhvyeHttp,
        this.logger,
        this.resto365JobService,
        this.resto365RestaurantService,
        user,
        correlationId,
      );
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
