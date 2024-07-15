import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Resto365CountryService } from './resto365-country.service';
import { CreateResto365CountryDto } from './dto/create-resto365-country.dto';
import { UpdateResto365CountryDto } from './dto/update-resto365-country.dto';

@Controller('resto365-country')
export class Resto365CountryController {
  constructor(
    private readonly resto365CountryService: Resto365CountryService,
  ) {}

  @Post()
  create(@Body() createResto365CountryDto: CreateResto365CountryDto) {
    return this.resto365CountryService.create(createResto365CountryDto);
  }

  @Get()
  findAll() {
    return this.resto365CountryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resto365CountryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResto365CountryDto: UpdateResto365CountryDto,
  ) {
    return this.resto365CountryService.update(+id, updateResto365CountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resto365CountryService.remove(+id);
  }
}
