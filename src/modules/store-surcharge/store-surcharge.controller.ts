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
import { StoreSurchargeService } from './store-surcharge.service';
import { CreateStoreSurchargeDto } from './dto/create-store-surcharge.dto';
import { UpdateStoreSurchargeDto } from './dto/update-store-surcharge.dto';
import { number } from 'yup';
import { ApiQuery } from '@nestjs/swagger';
import { GygQueryOptions } from '@modules/offer/types';
import { CreateStoreSurchargeBulkDto } from './dto/create-store-surcharge-bulk.dto';

@Controller('store-surcharges')
export class StoreSurchargeController {
  constructor(private readonly storeSurchargeService: StoreSurchargeService) {}

  @Post()
  create(@Body() createStoreSurchargeDto: CreateStoreSurchargeDto) {
    return this.storeSurchargeService.create(createStoreSurchargeDto);
  }

  @Post('/bulk')
  createBulk(@Body() createStoreSurchargeBulkDto: CreateStoreSurchargeBulkDto) {
    return this.storeSurchargeService.createBulk(createStoreSurchargeBulkDto);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: number })
  @ApiQuery({ name: 'take', type: number })
  findAll(@Query() query: GygQueryOptions) {
    return this.storeSurchargeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSurchargeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreSurchargeDto: UpdateStoreSurchargeDto,
  ) {
    return this.storeSurchargeService.update(id, updateStoreSurchargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSurchargeService.remove(id);
  }
}
