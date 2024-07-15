import { Test, TestingModule } from '@nestjs/testing';
import { StoreChannelController } from './store-channel.controller';
import { StoreChannelService } from './store-channel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreChannel } from './entities/store-channel.entity';

describe('StoreChannelController', () => {
  let controller: StoreChannelController;
  let service: StoreChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreChannelController],
      providers: [
        StoreChannelService,
        {
          provide: getRepositoryToken(StoreChannel),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<StoreChannelController>(StoreChannelController);
    service = module.get<StoreChannelService>(StoreChannelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a store channel', async () => {
    const storeChannel = new StoreChannel();
    storeChannel.id = 1;
    storeChannel.storeId = 1;
    storeChannel.channelId = 1;
    storeChannel.isActive = 1;

    jest.spyOn(service, 'create').mockResolvedValue(storeChannel);

    expect(
      await controller.create({
        storeId: '1',
        channelId: 1,
        isActive: 1,
        createdBy: '1',
      }),
    ).toBe(storeChannel);
  });

  it('should find all store channels', async () => {
    const storeChannels = [new StoreChannel()];
    jest.spyOn(service, 'findAll').mockResolvedValue(storeChannels);

    expect(await controller.findAll()).toBe(storeChannels);
  });

  it('should find a store channel', async () => {
    const storeChannel = new StoreChannel();
    jest.spyOn(service, 'findOne').mockResolvedValue(storeChannel);

    expect(await controller.findOne(1)).toBe(storeChannel);
  });

  it('should update a store channel', async () => {
    const storeChannel = new StoreChannel();
    jest.spyOn(service, 'update').mockResolvedValue(storeChannel);

    expect(
      await controller.update(1, {
        storeId: '1',
        channelId: 1,
        isActive: 1,
      }),
    ).toBe(storeChannel);
  });

  it('should remove a store channel', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    expect(await controller.remove(1)).toBeUndefined();
  });

  it('should find all store channels by store ID', async () => {
    const storeChannels = [new StoreChannel()];
    jest.spyOn(service, 'findAllByStoreId').mockResolvedValue(storeChannels);

    expect(await controller.findAllByStoreId(1)).toBe(storeChannels);
  });

  it('should upsert a store channel', async () => {
    const storeChannel = new StoreChannel();
    jest.spyOn(service, 'upsert').mockResolvedValue(storeChannel);

    expect(await controller.upsert(1, 1, true, 1, 1)).toBe(storeChannel);
  });
});
