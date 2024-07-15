import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MerchandiseInventoryService } from './merchandise-inventory.service';
import { CreateMerchandiseInventoryDto } from './dto/create-merchandise-inventory.dto';
import { UpdateMerchandiseInventoryDto } from './dto/update-merchandise-inventory.dto';
import { ApiQuery } from '@nestjs/swagger';
import { number } from 'yup';
import { GygQueryOptions } from '@modules/offer/types';

@Controller('merchandise-inventory')
export class MerchandiseInventoryController {
  constructor(
    private readonly merchandiseInventoryService: MerchandiseInventoryService,
  ) {}

  @Post()
  create(@Body() createMerchandiseInventoryDto: CreateMerchandiseInventoryDto) {
    return this.merchandiseInventoryService.create(
      createMerchandiseInventoryDto,
    );
  }

  @Get()
  @ApiQuery({ name: 'skip', type: number })
  @ApiQuery({ name: 'take', type: number })
  async findAll(@Query() query: GygQueryOptions) {
    return this.merchandiseInventoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchandiseInventoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchandiseInventoryDto: UpdateMerchandiseInventoryDto,
  ) {
    return this.merchandiseInventoryService.update(
      id,
      updateMerchandiseInventoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchandiseInventoryService.remove(id);
  }
}
