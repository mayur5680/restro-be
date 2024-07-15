import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerProductAttributes } from './entities/menu-container-product-attribute.entity';
import { CreateMenuContainerProductAttributeDto } from './dto/create-menu-container-product-attribute.dto';
import { UpdateMenuContainerProductAttributeDto } from './dto/update-menu-container-product-attribute.dto';

@Injectable()
export class MenuContainerProductAttributeService {
  constructor(
    @InjectRepository(MenuContainerProductAttributes)
    private readonly menuContainerProductAttributeRepository: Repository<MenuContainerProductAttributes>,
  ) {}

  async findAll(): Promise<MenuContainerProductAttributes[]> {
    return this.menuContainerProductAttributeRepository.find();
  }

  async findOne(
    id: number,
  ): Promise<MenuContainerProductAttributes | undefined> {
    return this.menuContainerProductAttributeRepository.findOne({
      where: { id },
    });
  }

  async create(
    createDto: CreateMenuContainerProductAttributeDto,
  ): Promise<MenuContainerProductAttributes> {
    const newAttribute =
      this.menuContainerProductAttributeRepository.create(createDto);
    return this.menuContainerProductAttributeRepository.save(newAttribute);
  }

  async update(
    id: number,
    updateDto: UpdateMenuContainerProductAttributeDto,
  ): Promise<MenuContainerProductAttributes> {
    const attribute = await this.findOne(id);
    this.menuContainerProductAttributeRepository.merge(attribute, updateDto);
    return this.menuContainerProductAttributeRepository.save(attribute);
  }

  async remove(id: number): Promise<void> {
    const attribute = await this.findOne(id);
    await this.menuContainerProductAttributeRepository.remove(attribute);
  }

  async findAllByMenuContainerProductId(
    menuContainerProductId: number,
  ): Promise<MenuContainerProductAttributes[]> {
    return this.menuContainerProductAttributeRepository.find({
      where: { menuContainerProductId },
    });
  }

  async findAllByPosMenuId(
    posMenuId: number,
  ): Promise<MenuContainerProductAttributes[]> {
    return this.menuContainerProductAttributeRepository.find({
      where: { posMenuId },
    });
  }

  async findAllByMenuContainerProductIdAndPosMenuId(
    menuContainerProductId: number,
    posMenuId: number,
  ): Promise<MenuContainerProductAttributes[]> {
    return this.menuContainerProductAttributeRepository.find({
      where: { menuContainerProductId, posMenuId },
    });
  }
}
