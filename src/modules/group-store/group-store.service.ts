import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupStore } from './entities/group-store.entity';
import { CreateGroupStoreDto } from './dto/create-group-store.dto';
import { UpdateGroupStoreDto } from './dto/update-group-store.dto';

@Injectable()
export class GroupStoreService {
  constructor(
    @InjectRepository(GroupStore)
    private readonly groupStoreRepository: Repository<GroupStore>,
  ) {}

  findAll() {
    return this.groupStoreRepository.find();
  }

  async findOne(id: number): Promise<GroupStore> {
    return this.groupStoreRepository
      .findOneOrFail({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException(`GroupStore with id ${id} not found`);
      });
  }

  public async findAllByStoreId(storeId: number): Promise<GroupStore[]> {
    return this.groupStoreRepository.find({
      where: { storeId },
    });
  }
  public async findByStoreId(storeId: number): Promise<GroupStore> {
    try {
      const groupStore = await this.groupStoreRepository.findOne({
        where: {
          storeId,
          isActive: true,
        },
      });

      if (!groupStore)
        throw new NotFoundException(
          `GroupStore with storeId ${storeId} not found`,
        );

      return groupStore;
    } catch (error) {
      throw error;
    }
  }

  async create(createGroupStoreDto: CreateGroupStoreDto): Promise<GroupStore> {
    const groupStore = this.groupStoreRepository.create(createGroupStoreDto);
    return this.groupStoreRepository.save(groupStore);
  }

  async update(
    id: number,
    updateGroupStoreDto: UpdateGroupStoreDto,
  ): Promise<GroupStore> {
    let groupStore = await this.groupStoreRepository.findOne({
      where: {
        id,
      },
    });

    if (!groupStore) {
      throw new NotFoundException(`GroupStore with id ${id} not found`);
    }

    groupStore = { ...groupStore, ...updateGroupStoreDto };
    return this.groupStoreRepository.save(groupStore);
  }
}
