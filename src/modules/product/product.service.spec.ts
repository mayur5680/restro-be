import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  const mockProduct = {
    id: 81326,
    name: 'Sml Choc Sundae',
    description: 'Sml Choc Sundae',
    containerId: 81315,
    parentProductId: null,
    posPlu: 951,
    posMenuId: 7,
    posMenuFlowId: null,
    productType: 'P',
    partType: null,
    actionType: null,
    price: 0.0,
    kilojoules: '652',
    isActive: true,
    image: null,
    imageTop: null,
    imageAngle: null,
    displayOrder: 2,
    createdAt: new Date('2022-07-06 09:36:37'),
    createdBy: 1,
    updatedAt: new Date('2023-06-29 09:27:46'),
    updatedBy: 1,
  };

  const inputData = {
    name: 'Sml Choc Sundae 1',
    description: 'Sml Choc Sundae description',
    containerId: 813115,
    parentProductId: null,
    posPlu: 9511,
    posMenuId: 71,
    posMenuFlowId: null,
    productType: 'P',
    partType: null,
    actionType: null,
    price: 10.0,
    kilojoules: '752',
    isActive: true,
    image: null,
    imageTop: null,
    imageAngle: null,
    displayOrder: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const id = 81326;
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      const result = await productService.findOne(id);
      expect(result).toEqual(mockProduct);
    });
  });
  describe('findAll', () => {
    it('should return an array of products', async () => {
      const expectedResult = {
        data: [mockProduct],
        meta: {
          totalRows: 1,
          pages: 1,
        },
      };

      jest
        .spyOn(productRepository, 'findAndCount')
        .mockResolvedValue([[mockProduct], 1]);

      const query: GygQueryOptions = {
        take: 10,
        skip: 0,
        sortBy: 'id',
      };

      const result = await productService.findAll(query);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('update', () => {
    it('should throw an error if the product does not exist', async () => {
      const id = 123;

      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValue({ affected: 0, raw: null, generatedMaps: null });

      try {
        await productService.update(id, inputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Product with ID ${id} not found.`);
      }
    });
    it('should return the updated product', async () => {
      const id = 123;

      jest.spyOn(productRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: mockProduct,
        generatedMaps: [],
      });

      jest.spyOn(productRepository, 'findOne').mockResolvedValue(mockProduct);

      const result = await productService.update(id, inputData);
      expect(result).toEqual(mockProduct);
    });
  });
  describe('create', () => {
    it('should return the created product', async () => {
      jest
        .spyOn(productRepository, 'create')
        .mockImplementation(() => mockProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(mockProduct);

      const result = await productService.create(inputData);
      expect(result).toEqual(mockProduct);
    });
  });
});
