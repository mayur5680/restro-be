import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ChannelGroupMenuTemplate } from './entities/channel-group-menu-template.entity';
import { CreateChannelGroupMenuTemplateDto } from './dto/create-channel-group-menu-template.dto';

@Injectable()
export class ChannelGroupMenuTemplateService {
  constructor(
    @InjectRepository(ChannelGroupMenuTemplate)
    private readonly channelGroupMenuTemplateRepository: Repository<ChannelGroupMenuTemplate>,
  ) {}

  async create(
    createChannelGroupMenuTemplateDto: CreateChannelGroupMenuTemplateDto,
  ): Promise<ChannelGroupMenuTemplate> {
    try {
      const channelGroupMenuTemplate =
        this.channelGroupMenuTemplateRepository.create(
          createChannelGroupMenuTemplateDto,
        );
      return await this.channelGroupMenuTemplateRepository.save(
        channelGroupMenuTemplate,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ChannelGroupMenuTemplate[]> {
    try {
      return await this.channelGroupMenuTemplateRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<ChannelGroupMenuTemplate> {
    try {
      const channelGroupMenuTemplate =
        await this.channelGroupMenuTemplateRepository.findOne({
          where: { id },
        });

      if (!channelGroupMenuTemplate) {
        throw new NotFoundException(
          `ChannelGroupMenuTemplate with ID ${id} not found`,
        );
      }

      return channelGroupMenuTemplate;
    } catch (error) {
      throw error;
    }
  }

  async findAllBychannelGroupId(
    channelGroupId: number[],
  ): Promise<ChannelGroupMenuTemplate[]> {
    try {
      const channelGroupMenuTemplate =
        await this.channelGroupMenuTemplateRepository.find({
          where: { channelGroupId: In(channelGroupId) },
        });
      return channelGroupMenuTemplate;
    } catch (error) {
      throw error;
    }
  }

  async findBychannelGroupId(
    channelGroupId: number,
  ): Promise<ChannelGroupMenuTemplate> {
    try {
      const channelGroupMenuTemplate =
        await this.channelGroupMenuTemplateRepository.findOne({
          where: { channelGroupId },
        });

      if (!channelGroupMenuTemplate) {
        throw new NotFoundException(
          `ChannelGroupMenuTemplate with channelGroupId ${channelGroupId} not found`,
        );
      }

      return channelGroupMenuTemplate;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateChannelGroupMenuTemplateDto: Partial<CreateChannelGroupMenuTemplateDto>,
  ): Promise<ChannelGroupMenuTemplate> {
    try {
      await this.findById(id);

      await this.channelGroupMenuTemplateRepository.update(
        id,
        updateChannelGroupMenuTemplateDto,
      );

      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const channelGroupMenuTemplate = await this.findById(id);
      await this.channelGroupMenuTemplateRepository.remove(
        channelGroupMenuTemplate,
      );
    } catch (error) {
      throw error;
    }
  }
}
