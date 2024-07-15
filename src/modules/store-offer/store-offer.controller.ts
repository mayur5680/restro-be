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
import { StoreOfferService } from './store-offer.service';
import { CreateStoreOfferDto } from './dto/create-store-offer.dto';
import { UpdateStoreOfferDto } from './dto/update-store-offer.dto';
import { ApiQuery } from '@nestjs/swagger';
import { GygQueryOptions } from '@modules/offer/types';
import { number } from 'yup';

@Controller('store-offer')
export class StoreOfferController {
  constructor(private readonly storeOfferService: StoreOfferService) {}

  @Post()
  create(@Body() createStoreOfferDto: CreateStoreOfferDto) {
    return this.storeOfferService.create(createStoreOfferDto);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: number })
  @ApiQuery({ name: 'take', type: number })
  findAll(@Query() query: GygQueryOptions) {
    return this.storeOfferService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeOfferService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreOfferDto: UpdateStoreOfferDto,
  ) {
    return this.storeOfferService.update(id, updateStoreOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeOfferService.remove(id);
  }
}
