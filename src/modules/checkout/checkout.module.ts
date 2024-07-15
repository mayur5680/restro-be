import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutController } from './checkout.controller';
import { Checkout } from './checkout.entity';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout])],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
