import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfferAttributeService } from './offer-attribute.service';
import { CreateOfferAttributeDto } from './dto/create-offer-attribute.dto';
import { UpdateOfferAttributeDto } from './dto/update-offer-attribute.dto';

@Controller('offer-attribute')
export class OfferAttributeController {
  constructor(private readonly offerAttributeService: OfferAttributeService) {}

  @Post()
  create(@Body() createOfferAttributeDto: CreateOfferAttributeDto) {
    return this.offerAttributeService.create(createOfferAttributeDto);
  }

  @Get()
  findAll() {
    return this.offerAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerAttributeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOfferAttributeDto: UpdateOfferAttributeDto,
  ) {
    return this.offerAttributeService.update(id, updateOfferAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerAttributeService.remove(id);
  }
}
