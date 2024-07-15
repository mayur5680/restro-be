import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerProductOverrideController } from './menu-container-product-override.controller';
import { MenuContainerProductOverrideService } from './menu-container-product-override.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerProductOverride } from './entities/menu-container-product-override.entity';
import { CreateMenuContainerProductOverrideDto } from './dto/create-menu-container-product-override.dto';

describe('MenuContainerProductOverrideController', () => {
  let controller: MenuContainerProductOverrideController;
  let service: MenuContainerProductOverrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerProductOverrideController],
      providers: [
        MenuContainerProductOverrideService,
        {
          provide: getRepositoryToken(MenuContainerProductOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerProductOverrideController>(
      MenuContainerProductOverrideController,
    );
    service = module.get<MenuContainerProductOverrideService>(
      MenuContainerProductOverrideService,
    );
  });

  describe('findAll', () => {
    it('should return an array of menu container product overrides', async () => {
      const result: MenuContainerProductOverride[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce({
        items: result,
        totalItems: result.length,
        currentPage: 1,
        totalPages: 1,
      });

      expect(await controller.findAll(1, 10)).toEqual({
        items: result,
        totalItems: result.length,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a menu container product override by ID', async () => {
      const result: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(result);

      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new menu container product override', async () => {
      const createDto: CreateMenuContainerProductOverrideDto =
        {} as CreateMenuContainerProductOverrideDto;
      const result: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;
      jest.spyOn(service, 'create').mockResolvedValueOnce(result);

      expect(await controller.create(createDto)).toEqual(result);
    });
  });

  describe('findAllFiltered', () => {
    it('should return an array of filtered menu container product overrides', async () => {
      const filterOptions = {
        storeId: 1,
        menuTemplateId: 2,
        menuContainerProductPosPlu: 3,
        menuContainerProductId: 4,
        menuContainerPosPlu: 5,
      };
      const result: MenuContainerProductOverride[] = [];
      jest.spyOn(service, 'findAllFiltered').mockResolvedValueOnce({
        items: result,
        totalItems: result.length,
        currentPage: 1,
        totalPages: 1,
      });

      expect(
        await controller.findAllFiltered(
          filterOptions.storeId,
          filterOptions.menuTemplateId,
          filterOptions.menuContainerProductPosPlu,
          filterOptions.menuContainerProductId,
          filterOptions.menuContainerPosPlu,
        ),
      ).toEqual({
        items: result,
        totalItems: result.length,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a menu container product override by ID', async () => {
      const result: MenuContainerProductOverride =
        {} as MenuContainerProductOverride;
      jest.spyOn(service, 'removeOne').mockResolvedValueOnce(result);

      expect(await controller.remove(1)).toEqual(result);
    });
  });
});
