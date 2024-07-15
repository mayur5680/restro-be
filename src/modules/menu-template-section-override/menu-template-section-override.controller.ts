import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { MenuTemplateSectionOverrideService } from './menu-template-section-override.service';
import { CreateMenuTemplateSectionOverrideDto } from './dto/create-menu-template-section-override.dto';

@Controller('menu-template-section-overrides')
export class MenuTemplateSectionOverrideController {
  constructor(
    private readonly menuTemplateSectionOverrideService: MenuTemplateSectionOverrideService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateMenuTemplateSectionOverrideDto) {
    return await this.menuTemplateSectionOverrideService.create(createDto);
  }

  @Get()
  async findAll(
    @Query('store') storeId?: number,
    @Query('section') sectionId?: number,
  ) {
    if (storeId && sectionId) {
      return this.menuTemplateSectionOverrideService.findAllByStoreIdAndSectionId(
        storeId,
        sectionId,
      );
    } else if (storeId) {
      return this.menuTemplateSectionOverrideService.findAllByStoreId(storeId);
    } else if (sectionId) {
      return this.menuTemplateSectionOverrideService.findAllBySectionId(
        sectionId,
      );
    } else {
      return this.menuTemplateSectionOverrideService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuTemplateSectionOverrideService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.menuTemplateSectionOverrideService.remove(id);
  }
}
