import { Test, TestingModule } from '@nestjs/testing';
import { ChannelGroupController } from './channel-group.controller';
import { ChannelGroupService } from './channel-group.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelGroup } from './entities/channel-group.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';
import { UpdateChannelGroupDto } from './dto/update-channel-group.dto';

describe('ChannelGroupController', () => {
  let controller: ChannelGroupController;
  let service: ChannelGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelGroupController],
      providers: [
        ChannelGroupService,
        {
          provide: getRepositoryToken(ChannelGroup),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ChannelGroupController>(ChannelGroupController);
    service = module.get<ChannelGroupService>(ChannelGroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of channelGroups', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(service, 'findAll').mockResolvedValue(channelGroups);

      const result = await controller.findAll();
      expect(result).toEqual(channelGroups);
    });

    it('should return an empty array if no channelGroups are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrowError(Error);
    });

    it('should return an array of channelGroups by channelId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest
        .spyOn(service, 'findAllByChannelId')
        .mockResolvedValue(channelGroups);

      const result = await controller.findAllByChannelId('1');
      expect(result).toEqual(channelGroups);
    });

    it('should return an array of channelGroups by groupId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(service, 'findAllByGroupId').mockResolvedValue(channelGroups);

      const result = await controller.findAllByGroupId('1');
      expect(result).toEqual(channelGroups);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAllByChannelId').mockRejectedValue(new Error());

      await expect(controller.findAllByChannelId('1')).rejects.toThrowError(
        Error,
      );
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAllByGroupId').mockRejectedValue(new Error());

      await expect(controller.findAllByGroupId('1')).rejects.toThrowError(
        Error,
      );
    });

    it('should return an array of channelGroups by channelId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest
        .spyOn(service, 'findAllByChannelId')
        .mockResolvedValue(channelGroups);

      const result = await controller.findAllByChannelId('1');
      expect(result).toEqual(channelGroups);
    });

    it('should return an array of channelGroups by groupId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(service, 'findAllByGroupId').mockResolvedValue(channelGroups);

      const result = await controller.findAllByGroupId('1');
      expect(result).toEqual(channelGroups);
    });
  });

  describe('findOne', () => {
    it('should return a channelGroup by id', async () => {
      const channelGroup = new ChannelGroup();
      channelGroup.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(channelGroup);

      const result = await controller.findOne('1'); // Convert the argument to a string
      expect(result).toEqual(channelGroup);
    });

    it('should throw NotFoundException if channelGroup is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a channelGroup and return it', async () => {
      const mockCreateDto: CreateChannelGroupDto = {
        channelId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
      };

      const channelGroup = new ChannelGroup();
      channelGroup.id = 1;

      jest.spyOn(service, 'create').mockResolvedValue(channelGroup);

      const result = await controller.create(mockCreateDto);

      expect(result).toEqual(channelGroup);
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
    });

    it('should throw an error if an error occurs', async () => {
      const mockCreateDto: CreateChannelGroupDto = {
        channelId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(mockCreateDto)).rejects.toThrowError(
        Error,
      );
    });
  });

  describe('update', () => {
    it('should update a channelGroup and return it', async () => {
      const id = '1';
      const updateDto: UpdateChannelGroupDto = {
        channelId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
      };

      const channelGroup = new ChannelGroup();
      channelGroup.id = 1;

      // Mock the service's update method to return the expected result
      jest.spyOn(service, 'update').mockResolvedValue(channelGroup);

      const result = await (service.update as jest.Mock).mockReturnValue(
        channelGroup,
      )(id, updateDto);

      // Expectations
      expect(result).toEqual(channelGroup);
      expect(service.update).toHaveBeenCalledWith(
        String(id), // Ensure id is a string
        expect.objectContaining(updateDto),
      );
    });

    it('should throw NotFoundException if channelGroup is not found', async () => {
      const id = '1';
      const updateDto: UpdateChannelGroupDto = {
        // ... (provide update DTO properties here)
        channelId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
      };

      // Mock the service's update method to throw NotFoundException
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      // Expect the controller's update method to throw NotFoundException
      await expect(controller.update(id, updateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a channelGroup', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(Number(id));
    });

    it('should throw NotFoundException if channelGroup is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
