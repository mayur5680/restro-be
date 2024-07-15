import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { User } from '@modules/user/user.entity';

@Controller('checkouts')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.checkoutService.findById(id);
  }

  @Get()
  public async findByUserId(@Query('userId') userId: User['id']) {
    return this.checkoutService.findByUserId(userId);
  }

  @Get()
  public async findByOrderId(@Query('orderId') orderId: string) {
    return this.checkoutService.findByOrderId(orderId);
  }

  @Get()
  public async findByCustomerId(@Query('customerId') customerId: string) {
    return this.checkoutService.findByCustomerId(customerId);
  }

  @Get()
  public async findByPosOrderId(@Query('posOrderId') posOrderId: number) {
    return this.checkoutService.findByPosOrderId(posOrderId);
  }

  @Get()
  public async findByStatus(@Query('status') status: string) {
    return this.checkoutService.findByStatus(status);
  }

  @Get()
  public async findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('pageSize', new ParseIntPipe()) pageSize: number = 10,
  ) {
    return this.checkoutService.findAll(page, pageSize);
  }
}
