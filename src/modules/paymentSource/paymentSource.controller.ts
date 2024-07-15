import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaymentSourceService } from './paymentSource.service';
import { PaymentSource } from './paymentSource.entity';

@Controller('payment-sources')
export class PaymentSourceController {
  constructor(private readonly paymentSourceService: PaymentSourceService) {}

  @Get(':id')
  public async findById(@Param('id') id: number) {
    return this.paymentSourceService.findById(id);
  }

  @Get()
  public async findByName(@Query('name') name: PaymentSource['name']) {
    return this.paymentSourceService.findByName(name);
  }

  @Get()
  public async findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('pageSize', new ParseIntPipe()) pageSize: number = 10,
  ) {
    return this.paymentSourceService.findAll(page, pageSize);
  }
}
