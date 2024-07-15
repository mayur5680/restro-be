import { Injectable, NotFoundException } from '@nestjs/common';
import { Channel } from './entities/channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  public async findOne(id: number): Promise<Channel> {
    try {
      const channel = this.channelRepository.findOne({
        where: { id },
      });

      if (!channel) {
        throw new NotFoundException(`Channel not found`);
      }

      return channel;
    } catch (error) {
      throw error;
    }
  }

  public async findByStoreId(id: number): Promise<Channel[]> {
    try {
      return this.channelRepository.find({
        where: {
          isActive: true,
          store: {
            id,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Channel[]> {
    try {
      return await this.channelRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
