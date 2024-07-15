import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MenuTemplateSectionService } from './menu-template-section.service';
import { CreateMenuTemplateSectionDto } from './dto/create-menu-template-section.dto';
import { MenuTemplateSection } from './entities/menu-template-section.entity';

@Controller('menu-template-sections')
export class MenuTemplateSectionController {
  constructor(
    private readonly menuTemplateSectionService: MenuTemplateSectionService,
  ) {}

  @Post()
  create(
    @Body() createMenuTemplateSectionDto: CreateMenuTemplateSectionDto,
  ): Promise<MenuTemplateSection> {
    return this.menuTemplateSectionService.create(createMenuTemplateSectionDto);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<MenuTemplateSection | undefined> {
    return this.menuTemplateSectionService.findById(id);
  }

  @Get()
  findAll(): Promise<MenuTemplateSection[]> {
    return this.menuTemplateSectionService.findAll();
  }

  @Get('by-section/:sectionId')
  findAllBySectionId(
    @Param('sectionId') sectionId: number,
  ): Promise<MenuTemplateSection[]> {
    return this.menuTemplateSectionService.findAllBySectionId(sectionId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateMenuTemplateSectionDto>,
  ): Promise<MenuTemplateSection> {
    return this.menuTemplateSectionService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.menuTemplateSectionService.remove(id);
  }
}
