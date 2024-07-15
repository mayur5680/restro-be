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
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ApiQuery } from '@nestjs/swagger';
import { number } from 'yup';
import { GygQueryOptions } from './types';
import { CloneOfferDto } from './dto/clone-offer.dto';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Post('clone')
  clone(@Body() cloneOfferDto: CloneOfferDto) {
    return this.offerService.clone(cloneOfferDto);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: number })
  @ApiQuery({ name: 'take', type: number })
  findAll(@Query() query: GygQueryOptions) {
    return this.offerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(id);
  }
}
