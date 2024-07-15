import { Injectable, NotFoundException } from '@nestjs/common';
import { ChannelGroupStore } from './entities/channel-group-store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateChannelGroupStoreDto } from './dto/update-channel-group-store.dto';

@Injectable()
export class ChannelGroupStoreService {
  constructor(
    @InjectRepository(ChannelGroupStore)
    private readonly channelGroupStoreRepository: Repository<ChannelGroupStore>,
  ) {}

  public async findOne(id: number): Promise<ChannelGroupStore> {
    return this.channelGroupStoreRepository
      .findOneOrFail({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException(`ChannelGroupStore not found`);
      });
  }

  public async findAll(): Promise<ChannelGroupStore[]> {
    return this.channelGroupStoreRepository.find();
  }

  public async findOneByStoreIdAndChannelId(
    storeId: number,
    channelId: number,
  ): Promise<ChannelGroupStore> {
    return this.channelGroupStoreRepository.findOne({
      where: { storeId, channelId },
    });
  }

  public async findAllByChannelId(
    channelId: number,
  ): Promise<ChannelGroupStore[]> {
    return this.channelGroupStoreRepository.find({
      where: { channelId },
    });
  }

  public async findAllByStoreId(storeId: number): Promise<ChannelGroupStore[]> {
    const channelGroupStore = await this.channelGroupStoreRepository.find({
      where: {
        storeId,
        isActive: true,
        channel: {
          isActive: true,
        },
        group: {
          isActive: true,
        },
      },
      relations: ['channel'],
    });

    if (!channelGroupStore.length) {
      throw new NotFoundException(
        `channelGroupStores with storeId ${storeId} not found`,
      );
    }

    return channelGroupStore;
  }

  public async findAllByStoreIds(
    storeId: number[],
  ): Promise<ChannelGroupStore[]> {
    const channelGroupStore = await this.channelGroupStoreRepository.find({
      where: {
        storeId: In(storeId),
        isActive: true,
        channel: {
          isActive: true,
        },
        group: {
          isActive: true,
        },
      },
      relations: ['channel'],
    });

    if (!channelGroupStore.length) {
      throw new NotFoundException(
        `channelGroupStores with storeId ${storeId} not found`,
      );
    }

    return channelGroupStore;
  }

  // New method for findAllByStoreIdAndChannelId
  public async findAllByStoreIdAndChannelId(
    storeId: number,
    channelId: number,
  ): Promise<ChannelGroupStore[]> {
    return this.channelGroupStoreRepository.find({
      where: { storeId, channelId },
    });
  }

  public async create(
    channelId: number,
    groupId: number,
    storeId: number,
    isActive: boolean,
    createdBy: number,
    updatedBy: number,
  ): Promise<ChannelGroupStore> {
    const channelGroupStore = new ChannelGroupStore();
    channelGroupStore.channelId = channelId;
    channelGroupStore.groupId = groupId;
    channelGroupStore.storeId = storeId;
    channelGroupStore.isActive = isActive;
    channelGroupStore.createdBy = createdBy;
    channelGroupStore.updatedBy = updatedBy;

    return this.channelGroupStoreRepository.save(channelGroupStore);
  }

  public async update(
    id: number,
    updateDto: UpdateChannelGroupStoreDto,
  ): Promise<ChannelGroupStore> {
    const existingEntity = (await this.channelGroupStoreRepository.findOne({
      where: { id },
    })) as ChannelGroupStore;

    if (!existingEntity) {
      throw new NotFoundException(`ChannelGroupStore with ID ${id} not found`);
    }

    // Assuming you have a method like `assign` to update entity properties
    Object.assign(existingEntity, updateDto);

    return this.channelGroupStoreRepository.save(existingEntity);
  }
}
