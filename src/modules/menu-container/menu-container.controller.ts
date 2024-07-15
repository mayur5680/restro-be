import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuContainerService } from './menu-container.service';
import { MenuContainer } from './entities/menu-container.entity';
import { CreateMenuContainerDto } from './dto/create-menu-container.dto';
import { UpdateMenuContainerDto } from './dto/update-menu-container.dto';

@Controller('menu-containers')
export class MenuContainerController {
  constructor(private readonly menuContainerService: MenuContainerService) {}

  @Post()
  async create(
    @Body() menuContainerData: CreateMenuContainerDto,
  ): Promise<MenuContainer> {
    return this.menuContainerService.create(menuContainerData);
  }

  @Get()
  async findAll(): Promise<MenuContainer[]> {
    return this.menuContainerService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuContainer | undefined> {
    return this.menuContainerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() menuContainerData: UpdateMenuContainerDto,
  ): Promise<MenuContainer> {
    return this.menuContainerService.update(id, menuContainerData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.menuContainerService.remove(id);
  }
}
