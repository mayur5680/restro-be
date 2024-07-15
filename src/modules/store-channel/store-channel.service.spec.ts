import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreChannelService } from './store-channel.service';
import { StoreChannel } from './entities/store-channel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Store } from '@modules/store/entities/store.entity';
import { Channel } from '@modules/channel/entities/channel.entity';

describe('StoreChannelService', () => {
  let service: StoreChannelService;
  let repository: Repository<StoreChannel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreChannelService,
        {
          provide: getRepositoryToken(StoreChannel),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            upsert: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StoreChannelService>(StoreChannelService);
    repository = module.get<Repository<StoreChannel>>(
      getRepositoryToken(StoreChannel),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a store channel', async () => {
      const storeChannel = new StoreChannel();
      storeChannel.id = 1;
      storeChannel.storeId = 1;
      storeChannel.channelId = 1;
      storeChannel.isActive = 1;

      jest.spyOn(repository, 'create').mockReturnValue(storeChannel);
      jest.spyOn(repository, 'save').mockResolvedValue(storeChannel);

      const result = await service.create({
        storeId: '1',
        channelId: 1,
        isActive: 1,
        createdBy: '1',
      });

      expect(result).toEqual(storeChannel);
    });
  });

  describe('findAll', () => {
    it('should return all store channels', async () => {
      const storeChannels: StoreChannel[] = [
        {
          id: 1,
          storeId: 1,
          channelId: 1,
          isActive: 1,
          createdAt: undefined,
          createdBy: '',
          updatedAt: undefined,
          updatedBy: '',
          deletedAt: undefined,
          deletedBy: '',
          store: new Store(),
          channel: new Channel(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(storeChannels);

      const result = await service.findAll();

      expect(result).toEqual(storeChannels);
    });
  });

  describe('findOne', () => {
    it('should return a store channel', async () => {
      const storeChannel = new StoreChannel();
      storeChannel.id = 1;
      storeChannel.storeId = 1;
      storeChannel.channelId = 1;
      storeChannel.isActive = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(storeChannel);

      const result = await service.findOne(1);

      expect(result).toEqual(storeChannel);
    });

    it('should throw an error if store channel is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrowError(
        new NotFoundException(`StoreChannel with ID 1 not found`),
      );
    });
  });

  describe('update', () => {
    it('should update a store channel', async () => {
      const storeChannel = new StoreChannel();
      storeChannel.id = 1;
      storeChannel.storeId = 1;
      storeChannel.channelId = 1;
      storeChannel.isActive = 1;

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      jest.spyOn(repository, 'findOne').mockResolvedValue(storeChannel);

      const result = await service.update(1, {
        storeId: '1',
        channelId: 1,
        isActive: 1,
        updatedBy: '1',
      });

      expect(result).toEqual(storeChannel);
    });

    it('should throw an error if store channel is not found', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0, raw: {}, generatedMaps: [] });

      await expect(service.update(1, {})).rejects.toThrowError(
        new NotFoundException(`StoreChannel with ID 1 not found`),
      );
    });
  });

  describe('remove', () => {
    it('should remove a store channel', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: {} });

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw an error if store channel is not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(1)).rejects.toThrowError(
        new NotFoundException(`StoreChannel with ID 1 not found`),
      );
    });
  });

  describe('findAllByStoreId', () => {
    it('should return all store channels by store ID', async () => {
      const storeChannels: StoreChannel[] = [
        {
          id: 1,
          storeId: 1,
          channelId: 1,
          isActive: 1,
          createdAt: undefined,
          createdBy: '',
          updatedAt: undefined,
          updatedBy: '',
          deletedAt: undefined,
          deletedBy: '',
          store: new Store(),
          channel: new Channel(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(storeChannels);

      const result = await service.findAllByStoreId(1);

      expect(result).toEqual(storeChannels);
    });

    it('should return an empty array if no store channels are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAllByStoreId(1);

      expect(result).toEqual([]);
    });

    it('should return an empty array if store ID is not found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAllByStoreId(1);

      expect(result).toEqual([]);
    });
  });

  describe('upsert', () => {
    it('should upsert a store channel', async () => {
      const storeChannel = new StoreChannel();
      storeChannel.id = 1;
      storeChannel.storeId = 1;
      storeChannel.channelId = 1;
      storeChannel.isActive = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(storeChannel);
      jest.spyOn(repository, 'save').mockResolvedValue(storeChannel);

      const result = await service.upsert(1, 1, true, 1, 1);

      expect(result).toEqual(storeChannel);
    });

    it('should create a store channel if it does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(repository, 'save').mockResolvedValue(new StoreChannel());

      const result = await service.upsert(1, 1, true, 1, 1);

      expect(result).toBeInstanceOf(StoreChannel);
    });
  });
});
