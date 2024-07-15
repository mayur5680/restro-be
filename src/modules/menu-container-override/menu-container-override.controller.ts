import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { MenuContainerOverrideService } from './menu-container-override.service';
import { CreateMenuContainerOverrideDto } from './dto/create-menu-container-override.dto';
import { UpdateMenuContainerOverrideDto } from './dto/update-menu-container-override.dto';

@Controller('menu-container-overrides')
export class MenuContainerOverrideController {
  constructor(
    private readonly menuContainerOverrideService: MenuContainerOverrideService,
  ) {}

  @Post()
  create(
    @Body() createMenuContainerOverrideDto: CreateMenuContainerOverrideDto,
  ) {
    return this.menuContainerOverrideService.create(
      createMenuContainerOverrideDto,
    );
  }

  @Get()
  findAll(@Query('store') storeId?: string) {
    if (storeId) {
      return this.menuContainerOverrideService.findAllByStoreId(
        Number(storeId),
      );
    }
    return this.menuContainerOverrideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuContainerOverrideService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuContainerOverrideDto: UpdateMenuContainerOverrideDto,
  ) {
    return this.menuContainerOverrideService.update(
      id,
      updateMenuContainerOverrideDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuContainerOverrideService.remove(Number(id));
  }
}
