import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MenuTemplateSectionOverride } from './entities/menu-template-section-override.entity';
import { CreateMenuTemplateSectionOverrideDto } from './dto/create-menu-template-section-override.dto';

@Injectable()
export class MenuTemplateSectionOverrideService {
  constructor(
    @InjectRepository(MenuTemplateSectionOverride)
    private menuTemplateSectionOverrideRepository: Repository<MenuTemplateSectionOverride>,
  ) {}

  async create(
    createDto: CreateMenuTemplateSectionOverrideDto,
  ): Promise<MenuTemplateSectionOverride> {
    const menuTemplateSectionOverride =
      this.menuTemplateSectionOverrideRepository.create(createDto);
    return await this.menuTemplateSectionOverrideRepository.save(
      menuTemplateSectionOverride,
    );
  }

  async findAllByStoreId(
    storeId: number,
  ): Promise<MenuTemplateSectionOverride[]> {
    return await this.menuTemplateSectionOverrideRepository.find({
      where: { storeId },
    });
  }

  async findAllBySectionId(
    sectionId: number,
  ): Promise<MenuTemplateSectionOverride[]> {
    return await this.menuTemplateSectionOverrideRepository.find({
      where: { sectionId } as unknown,
    });
  }

  async findAllByStoreIdAndSectionId(
    storeId: number,
    sectionId: number,
  ): Promise<MenuTemplateSectionOverride[]> {
    return await this.menuTemplateSectionOverrideRepository.find({
      where: { storeId, sectionId } as unknown,
    });
  }

  async findAll(): Promise<MenuTemplateSectionOverride[]> {
    return await this.menuTemplateSectionOverrideRepository.find();
  }

  async findOne(id: number): Promise<MenuTemplateSectionOverride | null> {
    return (
      (await this.menuTemplateSectionOverrideRepository.findOne({
        where: { id },
      })) || null
    );
  }

  async remove(id: number): Promise<void> {
    const menuTemplateSectionOverride =
      await this.menuTemplateSectionOverrideRepository.findOne({
        where: { id },
      });
    if (!menuTemplateSectionOverride) {
      throw new NotFoundException(
        `Menu Template Section Override with id ${id} not found.`,
      );
    }

    await this.menuTemplateSectionOverrideRepository.remove(
      menuTemplateSectionOverride,
    );
  }

  async findAllToDelete(
    groupId: number,
    channelId: number,
    storeId: number,
    sectionId: number,
    menuTemplateId: number,
    status: string,
  ): Promise<MenuTemplateSectionOverride[]> {
    return await this.menuTemplateSectionOverrideRepository.find({
      where: {
        groupId,
        channelId,
        storeId,
        sectionId,
        menuTemplateId,
        status,
      },
    });
  }

  async removeByIds(ids: number[]): Promise<void> {
    try {
      await this.menuTemplateSectionOverrideRepository.delete({
        id: In(ids),
      });
    } catch (error) {
      throw error;
    }
  }
}
