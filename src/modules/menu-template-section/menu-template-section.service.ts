import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuTemplateSectionDto } from './dto/create-menu-template-section.dto';
import { MenuTemplateSection } from './entities/menu-template-section.entity';

@Injectable()
export class MenuTemplateSectionService {
  constructor(
    @InjectRepository(MenuTemplateSection)
    private readonly menuTemplateSectionRepository: Repository<MenuTemplateSection>,
  ) {}

  async create(
    createMenuTemplateSectionDto: CreateMenuTemplateSectionDto,
  ): Promise<MenuTemplateSection> {
    const {
      menuTemplateId,
      sectionId,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
    } = createMenuTemplateSectionDto;
    const menuTemplateSection = new MenuTemplateSection();

    menuTemplateSection.menuTemplateId = menuTemplateId;
    menuTemplateSection.sectionId = sectionId;
    menuTemplateSection.createdBy = createdBy;
    menuTemplateSection.updatedBy = updatedBy;
    menuTemplateSection.createdAt = createdAt;
    menuTemplateSection.updatedAt = updatedAt;

    return await this.menuTemplateSectionRepository.save(menuTemplateSection);
  }

  async findById(id: number): Promise<MenuTemplateSection | undefined> {
    return this.menuTemplateSectionRepository.findOne({
      where: { id },
      relations: ['menuTemplate', 'section'],
    });
  }

  async findAll(): Promise<MenuTemplateSection[]> {
    return this.menuTemplateSectionRepository.find({
      relations: ['menuTemplate', 'section'],
    });
  }

  async findAllBySectionId(sectionId: number): Promise<MenuTemplateSection[]> {
    return this.menuTemplateSectionRepository.find({
      where: { sectionId },
      relations: ['menuTemplate', 'section'],
    });
  }

  async update(
    id: number,
    updateData: Partial<CreateMenuTemplateSectionDto>,
  ): Promise<MenuTemplateSection> {
    const menuTemplateSection =
      await this.menuTemplateSectionRepository.findOne({
        where: { id },
        relations: ['menuTemplate', 'section'],
      });

    if (!menuTemplateSection) {
      throw new NotFoundException(
        `MenuTemplateSection with ID ${id} not found`,
      );
    }

    Object.assign(menuTemplateSection, updateData);

    return this.menuTemplateSectionRepository.save(menuTemplateSection);
  }

  async remove(id: number): Promise<void> {
    const menuTemplateSection =
      await this.menuTemplateSectionRepository.findOne({
        where: { id },
        relations: ['menuTemplate', 'section'],
      });

    if (!menuTemplateSection) {
      throw new NotFoundException(
        `MenuTemplateSection with ID ${id} not found`,
      );
    }

    await this.menuTemplateSectionRepository.remove(menuTemplateSection);
  }
}
