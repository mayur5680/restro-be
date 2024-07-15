import { Test, TestingModule } from '@nestjs/testing';
import { GroupStoreService } from './group-store.service';
import { Repository } from 'typeorm';
import { GroupStore } from './entities/group-store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GroupStoreService', () => {
  let service: GroupStoreService;
  let repository: Repository<GroupStore>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupStoreService,
        {
          provide: getRepositoryToken(GroupStore),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GroupStoreService>(GroupStoreService);
    repository = module.get<Repository<GroupStore>>(
      getRepositoryToken(GroupStore),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of groupStores', async () => {
      const mockGroupeStores = [new GroupStore(), new GroupStore()];
      jest.spyOn(repository, 'find').mockResolvedValue(mockGroupeStores);

      const result = await service.findAll();
      expect(result).toEqual(mockGroupeStores);
    });

    it('should return an empty array if no groupStore are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a groupStore by id', async () => {
      const mockGroupStore = new GroupStore();
      mockGroupStore.id = 1;
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(mockGroupStore);

      const result = await service.findOne(1);
      expect(result).toEqual(mockGroupStore);
    });

    it('should throw NotFoundException if groupStore is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValue(new Error('GroupStore with id 1 not found'));

      await expect(service.findOne(1)).rejects.toThrowError(
        'GroupStore with id 1 not found',
      );
    });
  });

  describe('findByStoreId', () => {
    it('should return a groupStore by storeId', async () => {
      const mockGroupStore = new GroupStore();
      mockGroupStore.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockGroupStore);

      const result = await service.findByStoreId(1);
      expect(result).toEqual(mockGroupStore);
    });

    it('should throw NotFoundException if groupStore is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByStoreId(1)).rejects.toThrowError(
        'GroupStore with storeId 1 not found',
      );
    });
  });

  describe('create', () => {
    it('should create a groupStore', async () => {
      const mockGroupStore = new GroupStore();
      mockGroupStore.id = 1;
      jest.spyOn(repository, 'create').mockReturnValue(mockGroupStore);
      jest.spyOn(repository, 'save').mockResolvedValue(mockGroupStore);

      const result = await service.create({
        storeId: 1,
        groupId: 1,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      });
      expect(result).toEqual(mockGroupStore);
    });
  });

  describe('update', () => {
    it('should update a groupStore', async () => {
      const mockGroupStore = new GroupStore();
      mockGroupStore.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockGroupStore);
      jest.spyOn(repository, 'save').mockResolvedValue(mockGroupStore);

      const result = await service.update(1, {
        isActive: true,
        updatedBy: 1,
      });
      expect(result).toEqual(mockGroupStore);
    });

    it('should throw NotFoundException if groupStore is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update(1, {
          isActive: true,
          updatedBy: 1,
        }),
      ).rejects.toThrowError('GroupStore with id 1 not found');
    });
  });
});
