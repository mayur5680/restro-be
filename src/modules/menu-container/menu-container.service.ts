import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainer } from './entities/menu-container.entity';
import { CreateMenuContainerDto } from './dto/create-menu-container.dto';
import { UpdateMenuContainerDto } from './dto/update-menu-container.dto';

@Injectable()
export class MenuContainerService {
  constructor(
    @InjectRepository(MenuContainer)
    private menuContainerRepository: Repository<MenuContainer>,
  ) {}

  async create(
    menuContainerData: CreateMenuContainerDto,
  ): Promise<MenuContainer> {
    const menuContainer =
      this.menuContainerRepository.create(menuContainerData);
    return this.menuContainerRepository.save(menuContainer);
  }

  async findAll(): Promise<MenuContainer[]> {
    return this.menuContainerRepository.find();
  }

  async findOne(id: number): Promise<MenuContainer | undefined> {
    return this.menuContainerRepository.findOne({ where: { id } });
  }

  async findByPosPlu(posPlu: number): Promise<MenuContainer | undefined> {
    return this.menuContainerRepository.findOne({ where: { posPlu } });
  }

  async update(
    id: number,
    menuContainerData: UpdateMenuContainerDto,
  ): Promise<MenuContainer> {
    const existingMenuContainer = await this.menuContainerRepository.findOne({
      where: { id },
    });

    if (!existingMenuContainer) {
      throw new NotFoundException(`Menu Container with ID ${id} not found`);
    }

    // Check if menuContainerData is not undefined before merging
    if (menuContainerData) {
      Object.assign(existingMenuContainer, menuContainerData);
      await this.menuContainerRepository.save(existingMenuContainer);
    }

    return existingMenuContainer;
  }

  async remove(id: number): Promise<void> {
    const menuContainer = await this.menuContainerRepository.findOne({
      where: { id },
    });

    if (!menuContainer) {
      throw new NotFoundException(`Menu Container with ID ${id} not found`);
    }

    await this.menuContainerRepository.remove(menuContainer);
  }

  async findAllByPosMenuId(
    posMenuId: number[],
    storeId: number,
  ): Promise<MenuContainer[]> {
    return this.menuContainerRepository
      .createQueryBuilder('menuContainerRepository')
      .leftJoinAndSelect(
        'menuContainerRepository.menuContainerAttributes',
        'menuContainerAttributes',
      )
      .leftJoinAndSelect(
        'menuContainerRepository.menuContainerOverride',
        'menuContainerOverride',
        'menuContainerOverride.posMenuId IN (:...posMenuId) AND menuContainerOverride.storeId = :storeId',
        { posMenuId, storeId },
      )
      .where('menuContainerAttributes.posMenuId IN (:...posMenuId)', {
        posMenuId,
      })
      .getMany();
  }
}
