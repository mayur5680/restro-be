/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import {
  MenuContainerProductService,
  Pagination,
} from './menu-container-product.service';
import { MenuContainerProduct } from './entities/menu-container-product.entity';
import { CreateMenuContainerProductDto } from './dto/create-menu-container-product.dto';

@Controller('menu-container-products')
export class MenuContainerProductController {
  constructor(
    private readonly menuContainerProductService: MenuContainerProductService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MenuContainerProduct> {
    return this.menuContainerProductService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<MenuContainerProduct>> {
    return this.menuContainerProductService.findAll(page, limit);
  }

  @Post()
  async create(
    @Body() createMenuContainerProductDto: CreateMenuContainerProductDto,
  ): Promise<MenuContainerProduct> {
    return this.menuContainerProductService.create(
      createMenuContainerProductDto,
    );
  }

  @Get('filtered')
  async findAllFiltered(
    @Query('container') containerId?: number,
    @Query('posPlu') posPlu?: number,
    @Query('parentProduct') parentProductId?: number,
    @Query('posMenuFlow') posMenuFlowId?: number,
  ): Promise<Pagination<MenuContainerProduct>> {
    const filterOptions: {
      containerId?: number;
      posPlu?: number;
      parentProductId?: number;
      posMenuFlowId?: number;
    } = {};

    if (containerId) filterOptions.containerId = containerId;
    if (posPlu) filterOptions.posPlu = posPlu;
    if (parentProductId) filterOptions.parentProductId = parentProductId;
    if (posMenuFlowId) filterOptions.posMenuFlowId = posMenuFlowId;

    return this.menuContainerProductService.findAllFiltered(filterOptions);
  }
}
