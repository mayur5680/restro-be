import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerProductOverrideService } from './menu-container-product-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerProductOverride } from './entities/menu-container-product-override.entity';
import { CreateMenuContainerProductOverrideDto } from './dto/create-menu-container-product-override.dto';
import { NotFoundException } from '@nestjs/common';

describe('MenuContainerProductOverrideService', () => {
  let service: MenuContainerProductOverrideService;
  let repository: Repository<MenuContainerProductOverride>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContainerProductOverrideService,
        {
          provide: getRepositoryToken(MenuContainerProductOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuContainerProductOverrideService>(
      MenuContainerProductOverrideService,
    );
    repository = module.get<Repository<MenuContainerProductOverride>>(
      getRepositoryToken(MenuContainerProductOverride),
    );
  });

  describe('findAll', () => {
    it('should return a paginated list of menu container product overrides', async () => {
      const expectedResult = {
        items: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
      };

      jest.spyOn(repository, 'findAndCount').mockResolvedValueOnce([[], 0]);

      expect(await service.findAll(1, 10)).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a menu container product override by ID', async () => {
      const expectedResult: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expectedResult);

      expect(await service.findOne(1)).toEqual(expectedResult);
    });

    it('should throw NotFoundException if the menu container product override is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new menu container product override', async () => {
      const createDto: CreateMenuContainerProductOverrideDto =
        {} as CreateMenuContainerProductOverrideDto;
      const expectedResult: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;

      jest.spyOn(repository, 'create').mockReturnValueOnce(expectedResult);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expectedResult);

      expect(await service.create(createDto)).toEqual(expectedResult);
    });
  });

  describe('findAllFiltered', () => {
    it('should return a paginated list of filtered menu container product overrides', async () => {
      const filterOptions = {
        storeId: 1,
        menuTemplateId: 2,
        menuContainerProductPosPlu: 3,
        menuContainerProductId: 4,
        menuContainerPosPlu: 5,
      };
      const expectedResult = {
        items: [],
        totalItems: 0,
        currentPage: 1,
        totalPages: 0,
      };

      jest.spyOn(repository, 'findAndCount').mockResolvedValueOnce([[], 0]);

      expect(await service.findAllFiltered(filterOptions)).toEqual(
        expectedResult,
      );
    });
  });

  describe('remove', () => {
    it('should remove a menu container product override by ID', async () => {
      const expectedResult: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expectedResult);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(expectedResult);

      expect(await service.removeOne(1)).toEqual(expectedResult);
    });

    it('should throw NotFoundException if the menu container product override is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.removeOne(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
