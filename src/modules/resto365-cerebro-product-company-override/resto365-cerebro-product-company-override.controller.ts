import { Controller, Get } from '@nestjs/common';
import { Resto365CerebroProductCompanyOverrideService } from './resto365-cerebro-product-company-override.service';

@Controller('resto365-cerebro-product-company-override')
export class Resto365CerebroProductCompanyOverrideController {
  constructor(
    private readonly resto365CerebroProductCompanyOverrideService: Resto365CerebroProductCompanyOverrideService,
  ) {}

  @Get()
  findAll() {
    return this.resto365CerebroProductCompanyOverrideService.findAll();
  }
}
