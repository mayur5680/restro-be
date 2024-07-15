import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuContainerProductService } from './menu-container-product.service';
import { MenuContainerProduct } from './entities/menu-container-product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateMenuContainerProductDto } from './dto/create-menu-container-product.dto';

const mockRepository = {
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('MenuContainerProductService', () => {
  let service: MenuContainerProductService;
  let repository: Repository<MenuContainerProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContainerProductService,
        {
          provide: getRepositoryToken(MenuContainerProduct),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MenuContainerProductService>(
      MenuContainerProductService,
    );
    repository = module.get<Repository<MenuContainerProduct>>(
      getRepositoryToken(MenuContainerProduct),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a menuContainerProduct by ID', async () => {
      const menuContainerProduct: MenuContainerProduct = {
        id: 1,
        name: 'Test Product',
      } as MenuContainerProduct;
      mockRepository.findOne.mockReturnValue(menuContainerProduct);

      const result = await service.findOne(1);
      expect(result).toEqual(menuContainerProduct);
    });

    it('should throw NotFoundException if menuContainerProduct is not found', async () => {
      mockRepository.findOne.mockReturnValue(undefined);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a menu container', async () => {
      const createDto: CreateMenuContainerProductDto = {
        name: 'Test MenuContainerProduct',
        createdBy: 1,
      };
      const createdMenuContainerProduct = new MenuContainerProduct();
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(createdMenuContainerProduct);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(createdMenuContainerProduct);

      const result = await service.create(createDto);

      expect(result).toEqual(createdMenuContainerProduct);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(createdMenuContainerProduct);
    });
  });

  describe('findAllFiltered', () => {
    it('should return paginated menuContainerProducts based on filter options', async () => {
      const filterOptions = { containerId: 1 };
      const menuContainerProducts: MenuContainerProduct[] = [
        { id: 1, name: 'Filtered Product' } as MenuContainerProduct,
      ];
      const paginationResult = {
        items: menuContainerProducts,
        totalItems: menuContainerProducts.length,
        currentPage: 1,
        totalPages: 1,
      };
      mockRepository.findAndCount.mockReturnValueOnce([
        menuContainerProducts,
        menuContainerProducts.length,
      ]);

      const result = await service.findAllFiltered(filterOptions);
      expect(result).toEqual(paginationResult);
    });
  });
});
