import { Controller, Get, Param } from '@nestjs/common';

import { CustomerService } from './customer.service';
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  public async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.customerService.findById(id);
  }
}
