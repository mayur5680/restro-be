import { Test, TestingModule } from '@nestjs/testing';
import { ChannelGroupStoreController } from './channel-group-store.controller';
import { ChannelGroupStoreService } from './channel-group-store.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelGroupStore } from './entities/channel-group-store.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateChannelGroupStoreDto } from './dto/update-channel-group-store.dto';
import { Log } from 'src/shared';

describe('ChannelGroupStoreController', () => {
  let controller: ChannelGroupStoreController;
  let service: ChannelGroupStoreService;

  beforeAll(() => {
    Log.logInit();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelGroupStoreController],
      providers: [
        ChannelGroupStoreService,
        {
          provide: getRepositoryToken(ChannelGroupStore),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ChannelGroupStoreController>(
      ChannelGroupStoreController,
    );
    service = module.get<ChannelGroupStoreService>(ChannelGroupStoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of channelGroupStores', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(channelGroupStores);

      const result = await controller.findAll();
      expect(result).toEqual(channelGroupStores);
    });

    it('should return an array of channelGroupStores by storeId and channelId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest
        .spyOn(service, 'findAllByStoreIdAndChannelId')
        .mockResolvedValue(channelGroupStores);

      const result = await controller.findAll(1, 1);
      expect(result).toEqual(channelGroupStores);
    });

    it('should return an array of channelGroupStores by storeId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest
        .spyOn(service, 'findAllByStoreId')
        .mockResolvedValue(channelGroupStores);

      const result = await controller.findAll(1);
      expect(result).toEqual(channelGroupStores);
    });

    it('should return an array of channelGroupStores by channelId', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest
        .spyOn(service, 'findAllByChannelId')
        .mockResolvedValue(channelGroupStores);

      const result = await controller.findAll(undefined, 1);
      expect(result).toEqual(channelGroupStores);
    });

    it('should return an array of channelGroupStores with no filters', async () => {
      const channelGroupStores = [
        new ChannelGroupStore(),
        new ChannelGroupStore(),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(channelGroupStores);

      const result = await controller.findAll();
      expect(result).toEqual(channelGroupStores);
    });
  });

  describe('findOne', () => {
    it('should return a channelGroupStore by id', async () => {
      const channelGroupStore = new ChannelGroupStore();
      channelGroupStore.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue(channelGroupStore);

      const result = await controller.findOne(1, '123');
      expect(result).toEqual(channelGroupStore);
    });

    it('should throw NotFoundException if channelGroupStore is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1, '123')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a channelGroupStore and return it', async () => {
      const id = 1;
      const updateDto: UpdateChannelGroupStoreDto = {
        isActive: true,
        updatedBy: 1,
      };

      const channelGroupStore = new ChannelGroupStore();
      channelGroupStore.id = id;

      jest.spyOn(service, 'update').mockResolvedValue(channelGroupStore);

      const result = await controller.update(id, updateDto, '123');

      expect(result).toEqual(channelGroupStore);
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });

    it('should throw NotFoundException if channelGroupStore is not found', async () => {
      const id = 1;
      const updateDto: UpdateChannelGroupStoreDto = {
        isActive: true,
        updatedBy: 1,
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(
        controller.update(id, updateDto, '123'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
