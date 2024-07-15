import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionRepository.findOne({
      where: { id },
      relations: ['parentSection'],
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }

  async update(
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const section = await this.findOne(id);
    this.sectionRepository.merge(section, updateSectionDto);
    return await this.sectionRepository.save(section);
  }

  async remove(id: number): Promise<void> {
    const section = await this.findOne(id);
    await this.sectionRepository.remove(section);
  }
}
