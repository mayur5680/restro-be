import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';

class MockService {
  async findAll() {
    return [];
  }
}

describe('ChannelController', () => {
  let controller: ChannelController;
  let service: ChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [
        ChannelService,
        {
          provide: getRepositoryToken(Channel),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useValue: MockService,
        },
      ],
    }).compile();

    controller = module.get<ChannelController>(ChannelController);
    service = module.get<ChannelService>(ChannelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a channel', async () => {
      const channelMock = new Channel();
      channelMock.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(channelMock);

      const result = await controller.findOne('1');

      expect(result).toEqual(channelMock);
    });

    it('should throw NotFoundException if channel is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new Error('Channel not found'));

      await expect(controller.findOne('1')).rejects.toThrowError(
        'Channel not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of channels', async () => {
      const channelsMock = [new Channel(), new Channel()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(channelsMock);

      const result = await controller.findAll();

      expect(result).toEqual(channelsMock);
    });
  });
});
