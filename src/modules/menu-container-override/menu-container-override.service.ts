import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, In } from 'typeorm';
import { MenuContainerOverride } from './entities/menu-container-override.entity';
import { CreateMenuContainerOverrideDto } from './dto/create-menu-container-override.dto';
import { UpdateMenuContainerOverrideDto } from './dto/update-menu-container-override.dto';

@Injectable()
export class MenuContainerOverrideService {
  constructor(
    @InjectRepository(MenuContainerOverride)
    private readonly menuContainerOverrideRepository: Repository<MenuContainerOverride>,
  ) {}

  async create(
    createMenuContainerOverrideDto: CreateMenuContainerOverrideDto,
  ): Promise<MenuContainerOverride> {
    const menuContainerOverride = this.menuContainerOverrideRepository.create(
      createMenuContainerOverrideDto,
    );
    return await this.menuContainerOverrideRepository.save(
      menuContainerOverride,
    );
  }

  async findAll(): Promise<MenuContainerOverride[]> {
    return await this.menuContainerOverrideRepository.find();
  }

  async findAllByStoreId(storeId: number): Promise<MenuContainerOverride[]> {
    return await this.menuContainerOverrideRepository.find({
      where: { storeId },
    });
  }

  async findAllToDelete(
    groupId: number,
    channelId: number,
    storeId: number,
    menuTemplateId: number,
    menuContainerPosPlus: number,
    posMenuId: number,
    status: string,
  ): Promise<MenuContainerOverride[]> {
    return await this.menuContainerOverrideRepository.find({
      where: {
        groupId,
        channelId,
        storeId,
        menuTemplateId,
        menuContainerPosPlu: menuContainerPosPlus,
        posMenuId,
        status,
      },
    });
  }
  async findAllByProductPosPlu(
    posPlu: number[],
  ): Promise<MenuContainerOverride[]> {
    return await this.menuContainerOverrideRepository.find({
      where: { menuContainerPosPlu: In(posPlu) },
    });
  }

  async findAllFilterIds(
    groupId: number,
    channelId: number,
    storeId: number,
    posMenuId: number,
  ): Promise<MenuContainerOverride[]> {
    return await this.menuContainerOverrideRepository
      .createQueryBuilder()
      .where('(storeId IS NULL OR storeId = :storeId)', {
        storeId,
      })
      .andWhere('(channelId IS NULL OR channelId = :channelId)', {
        channelId,
      })
      .andWhere('(groupId IS NULL OR groupId = :groupId)', {
        groupId,
      })
      .andWhere('posMenuId = :posMenuId', { posMenuId })
      .getMany();
  }

  async findOne(id: number): Promise<MenuContainerOverride> {
    return await this.menuContainerOverrideRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(
    id: string,
    updateMenuContainerOverrideDto: UpdateMenuContainerOverrideDto,
  ) {
    const result = await this.menuContainerOverrideRepository.update(
      { id: Number(id) },
      updateMenuContainerOverrideDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Store Offer with ID ${id} not found.`);
    }

    return this.findOne(Number(id));
  }

  async remove(id: number): Promise<void> {
    const result: DeleteResult =
      await this.menuContainerOverrideRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `MenuContainerOverride with ID ${id} not found`,
      );
    }
  }

  async upsert(
    createMenuContainerProductOverrideDto: CreateMenuContainerOverrideDto[],
  ) {
    try {
      await this.menuContainerOverrideRepository.upsert(
        createMenuContainerProductOverrideDto,
        ['id'],
      );
    } catch (error) {
      throw error;
    }
  }

  async removeByIds(ids: number[]): Promise<void> {
    try {
      await this.menuContainerOverrideRepository.delete({
        id: In(ids),
      });
    } catch (error) {
      throw error;
    }
  }
}
