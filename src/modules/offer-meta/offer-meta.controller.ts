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
import { OfferMetaService } from './offer-meta.service';
import { CreateOfferMetaDto } from './dto/create-offer-meta.dto';
import { UpdateOfferMetaDto } from './dto/update-offer-meta.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GygQueryOptions } from '@modules/offer/types';
import { OfferMeta } from './entities/offer-meta.entity';

@Controller('offer-meta')
export class OfferMetaController {
  constructor(private readonly offerMetaService: OfferMetaService) {}

  @Post()
  create(@Body() createOfferMetaDto: CreateOfferMetaDto) {
    return this.offerMetaService.create(createOfferMetaDto);
  }

  @Get()
  @ApiQuery({ name: 'skip', type: Number })
  @ApiQuery({ name: 'take', type: Number })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: OfferMeta,
    isArray: true,
  })
  public async findAll(@Query() query: GygQueryOptions) {
    return this.offerMetaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerMetaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOfferMetaDto: UpdateOfferMetaDto,
  ) {
    return this.offerMetaService.update(id, updateOfferMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerMetaService.remove(id);
  }
}
