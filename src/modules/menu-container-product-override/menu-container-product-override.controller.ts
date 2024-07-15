import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import {
  MenuContainerProductOverrideService,
  Pagination,
} from './menu-container-product-override.service';
import { MenuContainerProductOverride } from './entities/menu-container-product-override.entity';
import { CreateMenuContainerProductOverrideDto } from './dto/create-menu-container-product-override.dto';

@Controller('menu-container-product-overrides')
export class MenuContainerProductOverrideController {
  constructor(
    private readonly menuContainerProductOverrideService: MenuContainerProductOverrideService,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<MenuContainerProductOverride>> {
    // Validate page and limit if needed
    return this.menuContainerProductOverrideService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<MenuContainerProductOverride> {
    return this.menuContainerProductOverrideService.findOne(id);
  }

  @Post()
  async create(
    @Body() createDto: CreateMenuContainerProductOverrideDto,
  ): Promise<MenuContainerProductOverride> {
    return this.menuContainerProductOverrideService.create(createDto);
  }

  @Get('filtered')
  async findAllFiltered(
    @Query('store') storeId?: number,
    @Query('menuTemplate') menuTemplateId?: number,
    @Query('menuContainerProductPosPlu') menuContainerProductPosPlu?: number,
    @Query('menuContainerProduct') menuContainerProductId?: number,
    @Query('menuContainerPosPlu') menuContainerPosPlu?: number,
  ): Promise<Pagination<MenuContainerProductOverride>> {
    const filterOptions: {
      storeId?: number;
      menuTemplateId?: number;
      menuContainerProductPosPlu?: number;
      menuContainerProductId?: number;
      menuContainerPosPlu?: number;
    } = {};

    if (storeId) filterOptions.storeId = storeId;
    if (menuTemplateId) filterOptions.menuTemplateId = menuTemplateId;
    if (menuContainerProductPosPlu)
      filterOptions.menuContainerProductPosPlu = menuContainerProductPosPlu;
    if (menuContainerProductId)
      filterOptions.menuContainerProductId = menuContainerProductId;
    if (menuContainerPosPlu)
      filterOptions.menuContainerPosPlu = menuContainerPosPlu;

    return this.menuContainerProductOverrideService.findAllFiltered(
      filterOptions,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<MenuContainerProductOverride> {
    return this.menuContainerProductOverrideService.removeOne(id);
  }
}
