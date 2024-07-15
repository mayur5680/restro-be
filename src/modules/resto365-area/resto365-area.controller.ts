import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Resto365AreaService } from './resto365-area.service';
import { CreateResto365AreaDto } from './dto/create-resto365-area.dto';
import { UpdateResto365AreaDto } from './dto/update-resto365-area.dto';
import { CountryCode } from '@modules/resto365-country/types';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';

@Controller('resto365-area')
export class Resto365AreaController {
  constructor(private readonly resto365AreaService: Resto365AreaService) {}

  @Post()
  create(@Body() createResto365AreaDto: CreateResto365AreaDto) {
    return this.resto365AreaService.create(createResto365AreaDto);
  }

  @Acl('read:user-management')
  @UseGuards(AclGuard)
  @Get()
  findAll(@Query('country') countries?: CountryCode | CountryCode[]) {
    if (countries) {
      return this.resto365AreaService.findByCountries(countries);
    } else {
      return this.resto365AreaService.findAll();
    }
  }

  @Acl('read:user-management')
  @UseGuards(AclGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include?: string[]) {
    return this.resto365AreaService.findOne(+id, include);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResto365AreaDto: UpdateResto365AreaDto,
  ) {
    return this.resto365AreaService.update(+id, updateResto365AreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resto365AreaService.remove(+id);
  }
}
