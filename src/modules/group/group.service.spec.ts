import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

describe('GroupService', () => {
  let service: GroupService;
  let repository: Repository<Group>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    repository = module.get<Repository<Group>>(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      const groupMock = new Group();
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValueOnce(groupMock);

      const result = await service.findOne(1);

      expect(result).toBe(groupMock);
    });

    it('should throw NotFoundException if group is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const groupsMock = [new Group(), new Group()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(groupsMock);

      const result = await service.findAll();

      expect(result).toEqual(groupsMock);
    });
  });
});
