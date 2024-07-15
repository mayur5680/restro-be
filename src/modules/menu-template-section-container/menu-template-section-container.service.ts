import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuTemplateSectionContainer } from './entities/menu-template-section-container.entity';
import { CreateMenuTemplateSectionContainerDto } from './dto/create-menu-template-section-container.dto';

@Injectable()
export class MenuTemplateSectionContainerService {
  constructor(
    @InjectRepository(MenuTemplateSectionContainer)
    private readonly menuTemplateSectionContainerRepository: Repository<MenuTemplateSectionContainer>,
  ) {}

  async create(
    createMenuTemplateSectionContainerDto: CreateMenuTemplateSectionContainerDto,
  ): Promise<MenuTemplateSectionContainer> {
    const menuTemplateSectionContainer =
      this.menuTemplateSectionContainerRepository.create(
        createMenuTemplateSectionContainerDto,
      );
    return this.menuTemplateSectionContainerRepository.save(
      menuTemplateSectionContainer,
    );
  }

  async findAll(): Promise<MenuTemplateSectionContainer[]> {
    return this.menuTemplateSectionContainerRepository.find();
  }

  async findOne(id: number): Promise<MenuTemplateSectionContainer | undefined> {
    return this.menuTemplateSectionContainerRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateMenuTemplateSectionContainerDto: CreateMenuTemplateSectionContainerDto,
  ): Promise<MenuTemplateSectionContainer> {
    const menuTemplateSectionContainer = await this.findOne(id);
    if (!menuTemplateSectionContainer) {
      throw new NotFoundException(
        `MenuTemplateSectionContainer with ID ${id} not found`,
      );
    }
    Object.assign(
      menuTemplateSectionContainer,
      updateMenuTemplateSectionContainerDto,
    );
    return this.menuTemplateSectionContainerRepository.save(
      menuTemplateSectionContainer,
    );
  }

  async remove(id: number): Promise<void> {
    await this.menuTemplateSectionContainerRepository.delete(id);
  }

  async findByMenuTemplateSectionId(
    menuTemplateSectionId: number,
  ): Promise<MenuTemplateSectionContainer[]> {
    return this.menuTemplateSectionContainerRepository.find({
      where: { menuTemplateSectionId },
    });
  }

  async findByMenuContainerPosPlu(
    menuContainerPosPlu: number,
  ): Promise<MenuTemplateSectionContainer[]> {
    return this.menuTemplateSectionContainerRepository.find({
      where: { menuContainerPosPlu },
    });
  }

  findByMenuTemplateSectionIdAndMenuContainerPosPlu(
    menuTemplateSectionId: number,
    menuContainerPosPlu: number,
  ):
    | MenuTemplateSectionContainer[]
    | PromiseLike<MenuTemplateSectionContainer[]> {
    return this.menuTemplateSectionContainerRepository.find({
      where: { menuTemplateSectionId, menuContainerPosPlu },
    });
  }
}
