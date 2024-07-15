import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelGroupService } from './channel-group.service';
import { ChannelGroup } from './entities/channel-group.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateChannelGroupDto } from './dto/create-channel-group.dto';

describe('ChannelGroupService', () => {
  let service: ChannelGroupService;
  let repository: Repository<ChannelGroup>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelGroupService,
        {
          provide: getRepositoryToken(ChannelGroup),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChannelGroupService>(ChannelGroupService);
    repository = module.get<Repository<ChannelGroup>>(
      getRepositoryToken(ChannelGroup),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a channel group', async () => {
      const createChannelGroupDto: CreateChannelGroupDto = {
        channelId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
      };

      const savedChannelGroup = new ChannelGroup();
      jest.spyOn(repository, 'create').mockReturnValue(savedChannelGroup);
      jest.spyOn(repository, 'save').mockResolvedValue(savedChannelGroup);

      const result = await service.create(createChannelGroupDto);

      expect(result).toEqual(savedChannelGroup);
      expect(repository.create).toHaveBeenCalledWith(createChannelGroupDto);
      expect(repository.save).toHaveBeenCalledWith(savedChannelGroup);
    });
  });

  describe('findAll', () => {
    it('should return an array of channel groups', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroups);

      const result = await service.findAll();

      expect(result).toEqual(channelGroups);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a channel group by id', async () => {
      const channelGroup = new ChannelGroup();
      jest.spyOn(repository, 'findOne').mockResolvedValue(channelGroup);

      const result = await service.findOne(1);

      expect(result).toEqual(channelGroup);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return undefined if channel group is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(1);

      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findAllByChannelId', () => {
    it('should return an array of channel groups by channelId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroups);

      const result = await service.findAllByChannelId(1);

      expect(result).toEqual(channelGroups);
      expect(repository.find).toHaveBeenCalledWith({ where: { channelId: 1 } });
    });
  });

  describe('findAllByGroupId', () => {
    it('should return an array of channel groups by groupId', async () => {
      const channelGroups = [new ChannelGroup(), new ChannelGroup()];
      jest.spyOn(repository, 'find').mockResolvedValue(channelGroups);

      const result = await service.findAllByGroupId(1);

      expect(result).toEqual(channelGroups);
      expect(repository.find).toHaveBeenCalledWith({ where: { groupId: 1 } });
    });
  });

  describe('update', () => {
    it('should update a channel group', async () => {
      const updateChannelGroupDto: Partial<CreateChannelGroupDto> = {
        isActive: false,
      };

      const channelGroup = new ChannelGroup();
      jest.spyOn(repository, 'update').mockResolvedValue({} as UpdateResult);
      jest.spyOn(repository, 'findOne').mockResolvedValue(channelGroup);

      const result = await service.update(1, updateChannelGroupDto);

      expect(result).toEqual(channelGroup);
      expect(repository.update).toHaveBeenCalledWith(1, updateChannelGroupDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return undefined if channel group is not found', async () => {
      const updateChannelGroupDto: Partial<CreateChannelGroupDto> = {
        isActive: false,
      };

      jest.spyOn(repository, 'update').mockResolvedValue({} as UpdateResult);
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.update(1, updateChannelGroupDto);

      expect(result).toBeUndefined();
      expect(repository.update).toHaveBeenCalledWith(1, updateChannelGroupDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove', () => {
    it('should remove a channel group', async () => {
      const removeSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({} as Promise<DeleteResult>);

      await service.remove(1);

      expect(removeSpy).toHaveBeenCalledWith(1);
    });
  });
});
