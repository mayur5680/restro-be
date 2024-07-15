import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelGroupMenuTemplateController } from './channel-group-menu-template.controller';
import { ChannelGroupMenuTemplateService } from './channel-group-menu-template.service';
import { CreateChannelGroupMenuTemplateDto } from './dto/create-channel-group-menu-template.dto';
import { ChannelGroupMenuTemplate } from './entities/channel-group-menu-template.entity';
import { NotFoundException } from '@nestjs/common';

describe('ChannelGroupMenuTemplateController', () => {
  let controller: ChannelGroupMenuTemplateController;
  let service: ChannelGroupMenuTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelGroupMenuTemplateController],
      providers: [
        ChannelGroupMenuTemplateService,
        {
          provide: getRepositoryToken(ChannelGroupMenuTemplate),
          useClass: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ChannelGroupMenuTemplateController>(
      ChannelGroupMenuTemplateController,
    );
    service = module.get<ChannelGroupMenuTemplateService>(
      ChannelGroupMenuTemplateService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ChannelGroupMenuTemplate', async () => {
      const createDto: CreateChannelGroupMenuTemplateDto = {
        channelGroupId: 1,
        menuTemplateId: 2,
        isActive: true,
        createdAt: new Date(),
        createdBy: 1,
        updatedAt: new Date(),
        updatedBy: 2,
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue({} as ChannelGroupMenuTemplate);

      const result = await controller.create(createDto);
      expect(result).toEqual({});
    });
  });

  describe('findAll', () => {
    it('should return an array of ChannelGroupMenuTemplates', async () => {
      const entities = [
        new ChannelGroupMenuTemplate(),
        new ChannelGroupMenuTemplate(),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(entities);

      const result = await controller.findAll();
      expect(result).toEqual(entities);
    });

    it('should return an empty array if no ChannelGroupMenuTemplates are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrowError(Error);
    });
  });

  describe('findById', () => {
    it('should find a ChannelGroupMenuTemplate by ID', async () => {
      const id = 1;
      jest
        .spyOn(service, 'findById')
        .mockResolvedValue({} as ChannelGroupMenuTemplate);

      const result = await controller.findById(id);
      expect(result).toEqual({});
    });

    it('should throw NotFoundException if ChannelGroupMenuTemplate is not found', async () => {
      const id = 999;
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.findById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a ChannelGroupMenuTemplate by ID', async () => {
      const id = 1;
      const updateDto: Partial<CreateChannelGroupMenuTemplateDto> = {
        isActive: false,
        updatedAt: new Date(),
        updatedBy: 3,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({} as ChannelGroupMenuTemplate);

      const result = await controller.update(id, updateDto);
      expect(result).toEqual({});
    });

    it('should throw NotFoundException if ChannelGroupMenuTemplate is not found', async () => {
      const id = 999;
      const updateDto: Partial<CreateChannelGroupMenuTemplateDto> = {
        isActive: false,
        updatedAt: new Date(),
        updatedBy: 3,
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(id, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a ChannelGroupMenuTemplate by ID', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(id);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if ChannelGroupMenuTemplate is not found', async () => {
      const id = 999;
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
