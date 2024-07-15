import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { MenuContainerProduct } from './entities/menu-container-product.entity';
import { CreateMenuContainerProductDto } from './dto/create-menu-container-product.dto';

export interface Pagination<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
@Injectable()
export class MenuContainerProductService {
  constructor(
    @InjectRepository(MenuContainerProduct)
    private readonly menuContainerProductRepository: Repository<MenuContainerProduct>,
  ) {}

  async findAll(
    page: number = 1, // Default to the first page
    limit: number = 10, // Default number of items per page
  ): Promise<Pagination<MenuContainerProduct>> {
    const [results, total] =
      await this.menuContainerProductRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

    return {
      items: results,
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<MenuContainerProduct> {
    const menuContainerProduct =
      await this.menuContainerProductRepository.findOne({
        where: { id },
      });

    if (!menuContainerProduct) {
      throw new NotFoundException(
        `MenuContainerProduct with ID ${id} not found`,
      );
    }

    return menuContainerProduct;
  }

  async create(
    createMenuContainerProductDto: CreateMenuContainerProductDto,
  ): Promise<MenuContainerProduct> {
    const menuContainerProduct = this.menuContainerProductRepository.create(
      createMenuContainerProductDto,
    );
    return this.menuContainerProductRepository.save(menuContainerProduct);
  }

  async findAllFiltered(filterOptions: {
    containerId?: number;
    posPlu?: number;
    parentProductId?: number;
    posMenuFlowId?: number;
  }): Promise<Pagination<MenuContainerProduct>> {
    const options: FindManyOptions<MenuContainerProduct> = {
      where: filterOptions,
    };

    const [results, total] =
      await this.menuContainerProductRepository.findAndCount(options);

    return {
      items: results,
      totalItems: total,
      currentPage: 1,
      totalPages: Math.ceil(total / 10),
    };
  }

  async findByPosPlu(
    posplu: number[],
    posMenuId: number[],
    storeId: number,
  ): Promise<MenuContainerProduct[]> {
    try {
      return this.menuContainerProductRepository
        .createQueryBuilder('menuContainerProductRepository')
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductAttributes',
          'menuContainerProductAttributes',
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductOverride',
          'menuContainerProductOverride',
          'menuContainerProductOverride.posMenuId IN (:...posMenuId) AND menuContainerProductOverride.storeId = :storeId',
          { posMenuId, storeId },
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.container',
          'container',
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.parentProduct',
          'parentProduct',
        )
        .where('menuContainerProductRepository.posPlu IN (:...posplu)', {
          posplu,
        })
        .andWhere(
          'menuContainerProductAttributes.posMenuId IN (:...posMenuId)',
          { posMenuId },
        )
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByPosPluForAllStore(
    posplu: number[],
    posMenuId: number[],
    storeId: number[],
  ): Promise<MenuContainerProduct[]> {
    try {
      return this.menuContainerProductRepository
        .createQueryBuilder('menuContainerProductRepository')
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductAttributes',
          'menuContainerProductAttributes',
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductOverride',
          'menuContainerProductOverride',
          'menuContainerProductOverride.posMenuId IN (:...posMenuId) AND menuContainerProductOverride.storeId IN (:...storeId)',
          { posMenuId, storeId },
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.container',
          'container',
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.parentProduct',
          'parentProduct',
        )
        .where('menuContainerProductRepository.posPlu IN (:...posplu)', {
          posplu,
        })
        .andWhere(
          'menuContainerProductAttributes.posMenuId IN (:...posMenuId)',
          { posMenuId },
        )
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByContainerId(
    containerId: number[],
    posMenuId: number[],
    storeId: number,
  ): Promise<MenuContainerProduct[]> {
    try {
      return this.menuContainerProductRepository
        .createQueryBuilder('menuContainerProductRepository')
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductAttributes',
          'menuContainerProductAttributes',
        )
        .leftJoinAndSelect(
          'menuContainerProductRepository.menuContainerProductOverride',
          'menuContainerProductOverride',
          'menuContainerProductOverride.posMenuId IN (:...posMenuId) AND menuContainerProductOverride.storeId = :storeId',
          { posMenuId, storeId },
        )
        .where(
          'menuContainerProductRepository.containerId IN (:...containerId)',
          {
            containerId,
          },
        )
        .andWhere(
          'menuContainerProductAttributes.posMenuId IN (:...posMenuId)',
          { posMenuId },
        )
        .andWhere('menuContainerProductRepository.productType = :productType', {
          productType: 'P',
        })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
