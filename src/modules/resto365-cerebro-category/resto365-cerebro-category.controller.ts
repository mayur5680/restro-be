import { Controller, Get } from '@nestjs/common';
import { Resto365CerebroCategoryService } from './resto365-cerebro-category.service';

@Controller('resto365-cerebro-category')
export class Resto365CerebroCategoryController {
  constructor(
    private readonly resto365CerebroCategoryService: Resto365CerebroCategoryService,
  ) {}

  @Get()
  findAll() {
    return this.resto365CerebroCategoryService.findAll();
  }
}
