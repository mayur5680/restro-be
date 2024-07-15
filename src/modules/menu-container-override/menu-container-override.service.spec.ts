import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerOverrideService } from './menu-container-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MenuContainerOverride } from './entities/menu-container-override.entity';
import { CreateMenuContainerOverrideDto } from './dto/create-menu-container-override.dto';
import { NotFoundException } from '@nestjs/common';

describe('MenuContainerOverrideService', () => {
  let service: MenuContainerOverrideService;
  let repository: Repository<MenuContainerOverride>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContainerOverrideService,
        {
          provide: getRepositoryToken(MenuContainerOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuContainerOverrideService>(
      MenuContainerOverrideService,
    );
    repository = module.get<Repository<MenuContainerOverride>>(
      getRepositoryToken(MenuContainerOverride),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu container override', async () => {
      const createDto: CreateMenuContainerOverrideDto = {
        // Fill with appropriate data for testing
      };

      const createdMenuContainerOverride = new MenuContainerOverride();
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(createdMenuContainerOverride);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(createdMenuContainerOverride);

      const result = await service.create(createDto);

      expect(result).toBe(createdMenuContainerOverride);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(
        createdMenuContainerOverride,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of menu container overrides', async () => {
      const menuContainerOverrides = [
        new MenuContainerOverride(),
        new MenuContainerOverride(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(menuContainerOverrides);

      const result = await service.findAll();

      expect(result).toBe(menuContainerOverrides);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findAllByStoreId', () => {
    it('should return an array of menu container overrides for a specific store', async () => {
      const storeId = 1;
      const menuContainerOverrides = [
        new MenuContainerOverride(),
        new MenuContainerOverride(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(menuContainerOverrides);

      const result = await service.findAllByStoreId(storeId);

      expect(result).toBe(menuContainerOverrides);
      expect(repository.find).toHaveBeenCalledWith({ where: { storeId } });
    });
  });

  describe('findOne', () => {
    it('should return a menu container override by ID', async () => {
      const id = 1;
      const menuContainerOverride = new MenuContainerOverride();
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValue(menuContainerOverride);

      const result = await service.findOne(id);

      expect(result).toBe(menuContainerOverride);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw NotFoundException if menu container override with specified ID is not found', async () => {
      const id = 2;
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValue(
          new NotFoundException(
            `MenuContainerOverride with ID ${id} not found`,
          ),
        );

      await expect(service.findOne(id)).rejects.toThrowError(
        new NotFoundException(`MenuContainerOverride with ID ${id} not found`),
      );
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it('should remove a menu container override', async () => {
      const id = 1;
      const deleteResult: DeleteResult = {
        raw: null,
        affected: 1,
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.remove(id)).resolves.not.toThrow();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when attempting to remove non-existing menu container override', async () => {
      const id = 2;
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: null, affected: 0 });

      await expect(service.remove(id)).rejects.toThrowError(
        'MenuContainerOverride with ID 2 not found',
      );
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
