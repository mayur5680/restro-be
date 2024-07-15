import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    try {
      const payment = await this.paymentService.findById(id);
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async getPaymentByOrderId(
    @Query('orderId') orderId: string,
  ): Promise<Payment[]> {
    return this.paymentService.findByOrderId(orderId);
  }
}
