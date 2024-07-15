import { Test, TestingModule } from '@nestjs/testing';
import { GroupStoreController } from './group-store.controller';
import { GroupStoreService } from './group-store.service';
import { Repository } from 'typeorm';
import { GroupStore } from './entities/group-store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Log } from 'src/shared';

describe('GroupStoreController', () => {
  let controller: GroupStoreController;
  let service: GroupStoreService;
  let repository: Repository<GroupStore>;

  beforeAll(() => {
    Log.logInit();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupStoreController],
      providers: [
        GroupStoreService,
        {
          provide: getRepositoryToken(GroupStore),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<GroupStoreController>(GroupStoreController);
    service = module.get<GroupStoreService>(GroupStoreService);
    repository = module.get<Repository<GroupStore>>(
      getRepositoryToken(GroupStore),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of groupStores', async () => {
      const mockGroupStores = [new GroupStore(), new GroupStore()];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockGroupStores);

      const result = await controller.findAll();
      expect(result).toEqual(mockGroupStores);
    });

    it('should return an empty array if no groupStores are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findByStoreId', () => {
    it('should throw NotFoundException if groupStore is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByStoreId(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a groupStore', async () => {
      const mockGroupStore = new GroupStore();
      mockGroupStore.id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockGroupStore);
      jest.spyOn(repository, 'save').mockResolvedValue(mockGroupStore);

      const result = await service.update(1, mockGroupStore);
      expect(result).toEqual(mockGroupStore);
    });

    it('should throw NotFoundException if groupStore is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, new GroupStore())).rejects.toThrowError();
    });
  });
});
