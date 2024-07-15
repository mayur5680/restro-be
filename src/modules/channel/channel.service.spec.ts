import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ChannelService', () => {
  let service: ChannelService;
  let repository: Repository<Channel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: getRepositoryToken(Channel),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    repository = module.get<Repository<Channel>>(getRepositoryToken(Channel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a channel', async () => {
      const channelMock = new Channel();
      channelMock.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(channelMock);

      const result = await service.findOne(1);

      expect(result).toEqual(channelMock);
    });

    it('should throw NotFoundException if channel is not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockRejectedValueOnce(new NotFoundException(`Channel not found`));

      await expect(service.findOne(1)).rejects.toThrowError(
        new NotFoundException(`Channel not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of channels', async () => {
      const channelsMock = [new Channel(), new Channel()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(channelsMock);

      const result = await service.findAll();

      expect(result).toEqual(channelsMock);
    });
  });
});
