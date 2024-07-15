import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Braintree } from './braintree.entity';
import { BraintreeService } from './braintree.service';
import { BraintreeController } from './braintree.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Braintree])],
  providers: [BraintreeService],
  controllers: [BraintreeController],
})
export class BraintreeModule {}
