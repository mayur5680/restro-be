// Import necessary modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';
import { ChannelGroup } from './entities/channel-group.entity';

@Injectable()
export class ChannelGroupService {
  constructor(
    @InjectRepository(ChannelGroup)
    private readonly channelGroupRepository: Repository<ChannelGroup>,
  ) {}

  async create(
    createChannelGroupDto: CreateChannelGroupDto,
  ): Promise<ChannelGroup> {
    try {
      const channelGroup = this.channelGroupRepository.create(
        createChannelGroupDto,
      );
      return await this.channelGroupRepository.save(channelGroup);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ChannelGroup[]> {
    try {
      return await this.channelGroupRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ChannelGroup | undefined> {
    try {
      return await this.channelGroupRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByGroupIdAndChannelId(
    groupId: number[],
    channelId: number[],
  ): Promise<ChannelGroup[]> {
    try {
      const channelGroup = await this.channelGroupRepository.find({
        where: {
          groupId: In(groupId),
          channelId: In(channelId),
        },
        relations: ['menuTemplate'],
      });
      return channelGroup;
    } catch (error) {
      throw error;
    }
  }

  async findOneByGroupIdAndChannelId(
    groupId: number,
    channelId: number,
  ): Promise<ChannelGroup> {
    try {
      const channelGroup = await this.channelGroupRepository.findOne({
        where: { groupId, channelId },
      });

      if (!channelGroup) {
        throw new NotFoundException(
          `ChannelGroup with groupId ${groupId} and channelId ${channelId} not found`,
        );
      }

      return channelGroup;
    } catch (error) {
      throw error;
    }
  }

  async findAllByChannelId(channelId: number): Promise<ChannelGroup[]> {
    try {
      return await this.channelGroupRepository.find({ where: { channelId } });
    } catch (error) {
      throw error;
    }
  }

  async findAllByGroupId(groupId: number): Promise<ChannelGroup[]> {
    try {
      return await this.channelGroupRepository.find({ where: { groupId } });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateChannelGroupDto: Partial<CreateChannelGroupDto>,
  ): Promise<ChannelGroup | undefined> {
    try {
      await this.channelGroupRepository.update(id, updateChannelGroupDto);
      return await this.channelGroupRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.channelGroupRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
