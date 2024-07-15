import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreChannelDto } from './dto/create-store-channel.dto';
import { UpdateStoreChannelDto } from './dto/update-store-channel.dto';
import { StoreChannel } from './entities/store-channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

@Injectable()
export class StoreChannelService {
  constructor(
    @InjectRepository(StoreChannel)
    private storeChannelRepository: Repository<StoreChannel>,
  ) {}

  async create(
    createStoreChannelDto: CreateStoreChannelDto,
  ): Promise<StoreChannel> {
    const newStoreChannel = this.storeChannelRepository.create({
      ...createStoreChannelDto,
      id: moment().unix() + Math.floor(Math.random() * 90) + 10,
      storeId: Number(createStoreChannelDto.storeId),
    });

    return this.storeChannelRepository.save(newStoreChannel);
  }

  async findAll(): Promise<StoreChannel[]> {
    return this.storeChannelRepository.find();
  }

  async findOne(id: number): Promise<StoreChannel> {
    const storeChannel = await this.storeChannelRepository.findOne({
      where: { id: id },
    });
    if (!storeChannel) {
      throw new NotFoundException(`StoreChannel with ID ${id} not found`);
    }
    return storeChannel;
  }

  async update(
    id: number,
    updateStoreChannelDto: UpdateStoreChannelDto,
  ): Promise<StoreChannel> {
    const { storeId, ...rest } = updateStoreChannelDto;
    const updatedStoreChannel = {
      ...rest,
      storeId: Number(storeId),
    };
    const result = await this.storeChannelRepository.update(
      id,
      updatedStoreChannel,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`StoreChannel with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.storeChannelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StoreChannel with ID ${id} not found`);
    }
  }

  async findAllByStoreId(storeId: number): Promise<StoreChannel[]> {
    return this.storeChannelRepository.find({ where: { storeId } });
  }

  async upsert(
    storeId: number,
    channelId: number,
    isActive: boolean,
    createdBy: number,
    updatedBy?: number,
  ): Promise<StoreChannel> {
    const storeChannel = await this.storeChannelRepository.findOne({
      where: { storeId, channelId },
    });

    if (storeChannel) {
      storeChannel.isActive = isActive ? 1 : 0;
      return this.storeChannelRepository.save(storeChannel);
    }

    const createStoreChannelDto = new CreateStoreChannelDto();

    const newStoreChannel = this.storeChannelRepository.create({
      ...createStoreChannelDto,
      storeId,
      channelId,
      isActive: isActive ? 1 : 0,
      createdBy: String(createdBy),
      updatedBy: updatedBy ? String(updatedBy) : null,
    });

    return this.storeChannelRepository.save(newStoreChannel);
  }
}
