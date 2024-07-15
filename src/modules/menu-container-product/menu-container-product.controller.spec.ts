import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerProductController } from './menu-container-product.controller';
import { MenuContainerProductService } from './menu-container-product.service';
import { MenuContainerProduct } from './entities/menu-container-product.entity';
import { CreateMenuContainerProductDto } from './dto/create-menu-container-product.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

class MockMenuContainerProductRepository extends Repository<MenuContainerProduct> {}

describe('MenuContainerProductController', () => {
  let controller: MenuContainerProductController;
  let service: MenuContainerProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerProductController],
      providers: [
        MenuContainerProductService,
        {
          provide: getRepositoryToken(MenuContainerProduct),
          useClass: MockMenuContainerProductRepository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerProductController>(
      MenuContainerProductController,
    );
    service = module.get<MenuContainerProductService>(
      MenuContainerProductService,
    );
  });

  describe('findOne', () => {
    it('should return a menuContainerProduct by ID', async () => {
      const menuContainerProduct: MenuContainerProduct = {
        id: 1,
        name: 'Test Product',
      } as MenuContainerProduct;
      jest.spyOn(service, 'findOne').mockResolvedValue(menuContainerProduct);

      const result = await controller.findOne(1);
      expect(result).toEqual(menuContainerProduct);
    });

    it('should throw NotFoundException if menuContainerProduct is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a new menuContainerProduct', async () => {
      const createDto: CreateMenuContainerProductDto = {
        name: 'New Product',
        createdBy: 0,
      };
      const createdMenuContainerProduct: MenuContainerProduct = {
        id: 1,
        ...createDto,
      } as MenuContainerProduct;
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(createdMenuContainerProduct);

      const result = await controller.create(createDto);
      expect(result).toEqual(createdMenuContainerProduct);
    });
  });
});
