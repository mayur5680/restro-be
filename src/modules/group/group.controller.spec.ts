import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a channel', async () => {
      const channelMock = new Group();
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
      const channelsMock = [new Group(), new Group()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(channelsMock);

      const result = await controller.findAll();

      expect(result).toEqual(channelsMock);
    });
  });
});
