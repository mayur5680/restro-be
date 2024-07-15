import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSourceController } from './paymentSource.controller';
import { PaymentSource } from './paymentSource.entity';
import { PaymentSourceService } from './paymentSource.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSource])],
  providers: [PaymentSourceService],
  controllers: [PaymentSourceController],
})
export class PaymentSourceModule {}
