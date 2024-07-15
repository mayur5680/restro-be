import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Resto365JobService } from './resto365-job.service';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { GygLog, exceptionWrapper } from 'src/shared';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { Loglevel } from 'src/context';

@Controller('resto365-job')
export class Resto365JobController {
  logger: GygLog;
  constructor(
    private readonly resto365JobService: Resto365JobService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(Resto365JobController.name);
  }

  @Get('/restaurant/:restaurantId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: `check job is in progress or not by restaurantId` })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Boolean,
  })
  async findJobStatus(
    @Param('restaurantId') restaurantId: number,
    @CorrelationId() correlationId: string,
  ): Promise<boolean> {
    const actionName = 'JobStatus';
    try {
      this.logger.writeLog(actionName, { restaurantId }, correlationId);

      await this.resto365RestaurantService.findRestaurant(restaurantId);

      const jobs =
        await this.resto365JobService.findActiveJobsByRestoId(restaurantId);

      this.logger.writeExitLog(
        actionName,
        { restaurantId },
        jobs.length,
        correlationId,
      );

      if (jobs.length) return true;
      else return false;
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        { restaurantId },
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }
}
