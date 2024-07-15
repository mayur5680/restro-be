import { Test, TestingModule } from '@nestjs/testing';
import { ChannelGroupStoreService } from './channel-group-store.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelGroupStore } from './entities/channel-group-store.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateChannelGroupStoreDto } from './dto/create-channel-group-store.dto';
import { UpdateChannelGroupStoreDto } from './dto/update-channel-group-store.dto';

describe('ChannelGroupStoreService', () => {
  let service: ChannelGroupStoreService;
  let repository: Repository<ChannelGroupStore>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelGroupStoreService,
        {
          provide: getRepositoryToken(ChannelGroupStore),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChannelGroupStoreService>(ChannelGroupStoreService);
    repository = module.get<Repository<ChannelGroupStore>>(
      getRepositoryToken(ChannelGroupStore),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a channelGroupStore by id', async () => {
      const channelGroupStore = new ChannelGroupStore();
      channelGroupStore.id = 1;
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValue(channelGroupStore);

      const result = await service.findOne(1);
      expect(result).toEqual(channelGroupStore);
    });

    it('should throw NotFoundException if channelGroupStore is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValue(new NotFoundException());

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of channelGroupStores', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroupStores);

      const result = await service.findAll();
      expect(result).toEqual(channelGroupStores);
    });
  });

  describe('findOneByStoreIdAndChannelId', () => {
    it('should return a channelGroupStore by storeId and channelId', async () => {
      const channelGroupStore = new ChannelGroupStore();
      channelGroupStore.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(channelGroupStore);

      const result = await service.findOneByStoreIdAndChannelId(1, 1);
      expect(result).toEqual(channelGroupStore);
    });
  });

  describe('findAllByChannelId', () => {
    it('should return an array of channelGroupStores by channelId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroupStores);

      const result = await service.findAllByChannelId(1);
      expect(result).toEqual(channelGroupStores);
    });
  });

  describe('findAllByStoreId', () => {
    it('should return an array of channelGroupStores by storeId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroupStores);

      const result = await service.findAllByStoreId(1);
      expect(result).toEqual(channelGroupStores);
    });
  });

  describe('findAllByStoreIdAndChannelId', () => {
    it('should return an array of channelGroupStores by storeId and channelId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroupStores);

      const result = await service.findAllByStoreIdAndChannelId(1, 1);
      expect(result).toEqual(channelGroupStores);
    });
  });

  describe('create', () => {
    it('should create a channelGroupStore and return it', async () => {
      const mockCreateDto: CreateChannelGroupStoreDto = {
        channelId: 1,
        groupId: 1,
        storeId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };

      const channelGroupStore = new ChannelGroupStore();
      channelGroupStore.id = 1;
      jest.spyOn(repository, 'save').mockResolvedValue(channelGroupStore);

      const result = await service.create(
        mockCreateDto.channelId,
        mockCreateDto.groupId,
        mockCreateDto.storeId,
        mockCreateDto.isActive,
        mockCreateDto.createdBy,
        mockCreateDto.updatedBy,
      );

      expect(result).toEqual(channelGroupStore);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateDto),
      );
    });

    it('should throw an error if repository.save fails', async () => {
      const mockCreateDto: CreateChannelGroupStoreDto = {
        channelId: 1,
        groupId: 1,
        storeId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Save failed'));

      await expect(
        service.create(
          mockCreateDto.channelId,
          mockCreateDto.groupId,
          mockCreateDto.storeId,
          mockCreateDto.isActive,
          mockCreateDto.createdBy,
          mockCreateDto.updatedBy,
        ),
      ).rejects.toThrowError('Save failed');
    });

    it('should throw an error if repository.save is called with invalid data', async () => {
      const invalidCreateDto: CreateChannelGroupStoreDto = {
        channelId: 0,
        groupId: 0,
        storeId: 0,
        isActive: false,
        createdBy: 0,
        updatedBy: 0,
      };

      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.reject(new Error('Save failed')));

      await expect(
        service.create(
          invalidCreateDto.channelId,
          invalidCreateDto.groupId,
          invalidCreateDto.storeId,
          invalidCreateDto.isActive,
          invalidCreateDto.createdBy,
          invalidCreateDto.updatedBy,
        ),
      ).rejects.toThrowError(Error); // Change AssertionError to Error
    });
  });

  describe('update', () => {
    it('should update a channelGroupStore and return it', async () => {
      const id = 1;
      const updateDto: UpdateChannelGroupStoreDto = {
        isActive: false,
        updatedBy: 1,
      };

      const existingEntity = new ChannelGroupStore();
      existingEntity.id = id;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingEntity);

      jest.spyOn(repository, 'save').mockResolvedValue(existingEntity);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(existingEntity);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...existingEntity,
          ...updateDto,
        }),
      );
    });

    it('should throw NotFoundException if channelGroupStore is not found', async () => {
      const id = 1;
      const updateDto: UpdateChannelGroupStoreDto = {
        isActive: false,
        updatedBy: 1,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
