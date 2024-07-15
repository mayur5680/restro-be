import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { LoyaltyHistoryService } from './loyaltyHistory.service';
import { FindAllQueryParams } from './loyaltyHistory.types';
import { FindAllQueryParamPipe } from './loyaltyHistory.controller.pipe';
@Controller('loyalty-history')
export class LoyaltyHistoryController {
  constructor(private readonly loyaltyHistoryService: LoyaltyHistoryService) {}

  @Get()
  public async findAll(
    @Query(FindAllQueryParamPipe) queryParams: FindAllQueryParams,
  ) {
    if (queryParams.userId) {
      return this.loyaltyHistoryService.findByUserId(queryParams.userId);
    } else if (queryParams.posMemberId) {
      return this.loyaltyHistoryService.findByPosMemberId(
        queryParams.posMemberId,
      );
    } else if (queryParams.cardNumber) {
      return this.loyaltyHistoryService.findByCardNumber(
        queryParams.cardNumber,
      );
    } else {
      return this.loyaltyHistoryService.findAll();
    }
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    const loyaltyHistory = await this.loyaltyHistoryService.findById(id);
    if (!loyaltyHistory) {
      throw new NotFoundException('Loyalty History not found');
    }

    return loyaltyHistory;
  }
}
