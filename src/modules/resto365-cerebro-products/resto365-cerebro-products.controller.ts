import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Resto365CerebroProduct } from './entities/resto365-cerebro-product.entity';
import { Resto365CerebroProductsService } from './resto365-cerebro-products.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { exceptionWrapper } from 'src/shared';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';

@Controller('cerebro-products')
export class Resto365CerebroProductsController {
  constructor(
    private readonly cerebroProductsService: Resto365CerebroProductsService,
  ) {}

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Find Cerebro Products by ComponentProductId' })
  @ApiQuery({
    name: 'productCompanyNameNumber',
    required: true,
    type: 'string',
    description: 'ProductCompanyNameNumber',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [Resto365CerebroProduct],
  })
  @ApiResponse({ status: 404, description: 'CerebroProducts Not Found' })
  async findByComponentProductId(
    @Query('productCompanyNameNumber') productCompanyNameNumber: string,
  ): Promise<Resto365CerebroProduct[]> {
    try {
      const cerebroProducts =
        await this.cerebroProductsService.findByComponentProductId(
          productCompanyNameNumber,
        );
      if (!cerebroProducts || cerebroProducts.length === 0) {
        throw new NotFoundException(`CerebroProducts not found`);
      }
      return cerebroProducts;
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
