import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, In } from 'typeorm';
import { MenuContainerProductOverride } from './entities/menu-container-product-override.entity';
import { CreateMenuContainerProductOverrideDto } from './dto/create-menu-container-product-override.dto';

export interface Pagination<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
@Injectable()
export class MenuContainerProductOverrideService {
  constructor(
    @InjectRepository(MenuContainerProductOverride)
    private readonly menuContainerProductOverrideRepository: Repository<MenuContainerProductOverride>,
  ) {}

  async findAll(
    page: number = 1, // Default to the first page
    limit: number = 10, // Default number of items per page
  ): Promise<Pagination<MenuContainerProductOverride>> {
    try {
      const [results, total] =
        await this.menuContainerProductOverrideRepository.findAndCount({
          take: limit,
          skip: (page - 1) * limit,
        });

      return {
        items: results,
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<MenuContainerProductOverride> {
    try {
      const menuContainerProductOverride =
        await this.menuContainerProductOverrideRepository.findOne({
          where: { id },
        });

      if (!menuContainerProductOverride) {
        throw new NotFoundException(
          `MenuContainerProductOverride with ID ${id} not found`,
        );
      }

      return menuContainerProductOverride;
    } catch (error) {
      throw error;
    }
  }

  async removeOne(id: number): Promise<MenuContainerProductOverride> {
    try {
      const menuContainerProductOverride = await this.findOne(id);

      return this.menuContainerProductOverrideRepository.remove(
        menuContainerProductOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  async create(
    createMenuContainerProductOverrideDto: CreateMenuContainerProductOverrideDto,
  ): Promise<MenuContainerProductOverride> {
    try {
      const menuContainerProductOverride =
        this.menuContainerProductOverrideRepository.create(
          createMenuContainerProductOverrideDto,
        );
      return this.menuContainerProductOverrideRepository.save(
        menuContainerProductOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllFiltered(filterOptions: {
    storeId?: number;
    menuTemplateId?: number;
    menuContainerProductPosPlu?: number;
    menuContainerProductId?: number;
    menuContainerPosPlu?: number;
  }): Promise<Pagination<MenuContainerProductOverride>> {
    try {
      const options: FindManyOptions<MenuContainerProductOverride> = {
        where: filterOptions,
      };

      const [results, total] =
        await this.menuContainerProductOverrideRepository.findAndCount(options);

      return {
        items: results,
        totalItems: total,
        currentPage: 1,
        totalPages: Math.ceil(total / 10),
      };
    } catch (error) {
      throw error;
    }
  }

  async findbyStoreAndMenu(
    storeId: number,
    posMenuId: number[],
  ): Promise<MenuContainerProductOverride[]> {
    try {
      return await this.menuContainerProductOverrideRepository.find({
        where: { storeId, posMenuId: In(posMenuId) },
      });
    } catch (error) {
      throw error;
    }
  }

  async findbyStoreAndMenuAndPosPLU(
    storeId: number,
    posMenuId: number[],
    menuContainerProductPosPlu: number[],
  ): Promise<MenuContainerProductOverride[]> {
    try {
      return await this.menuContainerProductOverrideRepository.find({
        where: {
          storeId,
          posMenuId: In(posMenuId),
          menuContainerProductPosPlu: In(menuContainerProductPosPlu),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async upsert(
    createMenuContainerProductOverrideDto: CreateMenuContainerProductOverrideDto[],
  ) {
    try {
      await this.menuContainerProductOverrideRepository.upsert(
        createMenuContainerProductOverrideDto,
        [
          'menuContainerProductPosPlu',
          'parentMenuContainerProductPosPlu',
          'menuContainerPosPlu',
          'storeId',
        ],
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(
    posPlu: number[],
    storeId: number,
    posMenuId: number[],
  ): Promise<void> {
    try {
      await this.menuContainerProductOverrideRepository.delete({
        menuContainerProductPosPlu: In(posPlu),
        storeId,
        posMenuId: In(posMenuId),
      });
    } catch (error) {
      throw error;
    }
  }
}
