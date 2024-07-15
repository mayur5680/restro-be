import {
  Controller,
  Get,
  Query,
  NotFoundException,
  Patch,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ParseNonEmptyStringPipe } from '@modules/user/user.controller.pipe';
import { LoyaltyService } from './loyalty.service';
import {
  LoyaltyUserStatsDTO,
  UpdateLoyalty,
  UpdateLoyaltyDTO,
} from './loyalty.dto';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { User } from '@modules/auth/UserDecorator';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { UUID } from 'crypto';
import { GygLog, exceptionWrapper } from 'src/shared';
import { ConfigService } from '@modules/config/config.service';
import { Loglevel, LoyaltyType } from 'src/context';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';

@Audit('GuestExperience/Loyalty')
@Controller('loyalty')
export class LoyaltyController {
  logger: GygLog;
  constructor(
    private readonly loyaltyService: LoyaltyService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new GygLog(LoyaltyController.name);
  }

  @Acl('read:guest-experience')
  @UseGuards(AclGuard)
  @Get('stats')
  public async getLoyaltyStatsByUserId(
    @Query('userId', ParseNonEmptyStringPipe) userId: string,
  ) {
    try {
      await this.configService.bhyveConfig.bhvyeHttp.get(
        `/user/loyalty/${userId}`,
      );

      const loyalty = await this.loyaltyService.getLoyaltyByUserId(userId);
      if (!loyalty) {
        throw new NotFoundException('No loyalty stats for user');
      }

      return plainToInstance(LoyaltyUserStatsDTO, loyalty, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Acl('update:guest-experience')
  @UseGuards(AclGuard)
  @Patch('/user/:userId')
  @ApiOperation({ summary: 'Update user loyalty points' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async updateLoyaltyStats(
    @Param('userId') userId: number,
    @User() user: Resto365User,
    @Body() updateLoyaltyDTO: UpdateLoyaltyDTO,
    @CorrelationId() correlationId: UUID,
  ) {
    const actionName = 'updateLoyalty';
    try {
      this.logger.writeLog(
        `${actionName} - request`,
        updateLoyaltyDTO,
        correlationId,
      );

      //Process the loyalty update
      let loyaltyDetail: UpdateLoyalty = {
        points: updateLoyaltyDTO.value,
        storeId: updateLoyaltyDTO.storeId,
        comment: `${user.id}-${updateLoyaltyDTO.comment.substring(0, 30)}`, //Limit the comment to 30 characters
      };

      //If the loyalty type is dollar, process the dollar update
      if (updateLoyaltyDTO.loyaltyType === LoyaltyType.DOLLAR) {
        loyaltyDetail = {
          gygDollar: updateLoyaltyDTO.value,
          storeId: updateLoyaltyDTO.storeId,
          comment: `${user.id}-${updateLoyaltyDTO.comment.substring(0, 30)}`, //Limit the comment to 30 characters
        };
      }

      //Update the loyalty
      const { data } = await this.configService.bhyveConfig.bhvyeHttp.patch(
        `/admin/user/${userId}`,
        {
          loyalty: loyaltyDetail,
        },
      );

      this.logger.writeExitLog(
        actionName,
        updateLoyaltyDTO,
        data,
        correlationId,
      );

      return {
        data,
        _metadata: {
          entitySource: EntitySource.GuestUser,
          entitySourceId: updateLoyaltyDTO.storeId,
          description: updateLoyaltyDTO.comment,
        },
      };
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        updateLoyaltyDTO,
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }
}
