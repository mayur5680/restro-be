import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  async findAll(): Promise<Section[]> {
    return this.sectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Section> {
    const sectionId = parseInt(id, 10);
    return this.sectionService.findOne(sectionId);
  }

  @Post()
  async create(@Body() createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionService.create(createSectionDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const sectionId = parseInt(id, 10);
    return this.sectionService.update(sectionId, updateSectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const sectionId = parseInt(id, 10);
    await this.sectionService.remove(sectionId);
  }
}
