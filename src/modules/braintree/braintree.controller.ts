import { Controller, Get, Param } from '@nestjs/common';

import { BraintreeService } from './braintree.service';

@Controller('braintree')
export class BraintreeController {
  constructor(private readonly braintreeService: BraintreeService) {}

  @Get()
  public async findAll() {
    return this.braintreeService.findAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.braintreeService.findById(id);
  }
}
