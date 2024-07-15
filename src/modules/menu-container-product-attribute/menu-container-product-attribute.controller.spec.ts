import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerProductAttributeController } from './menu-container-product-attribute.controller';
import { MenuContainerProductAttributeService } from './menu-container-product-attribute.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuContainerProductAttributes } from './entities/menu-container-product-attribute.entity';
import { CreateMenuContainerProductAttributeDto } from './dto/create-menu-container-product-attribute.dto';
import { UpdateMenuContainerProductAttributeDto } from './dto/update-menu-container-product-attribute.dto';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { NotFoundException } from '@nestjs/common';

describe('MenuContainerProductAttributeController', () => {
  let controller: MenuContainerProductAttributeController;
  let service: MenuContainerProductAttributeService;

  const mockCreateDto: CreateMenuContainerProductAttributeDto = {
    menuContainerProductId: 1,
    posMenuId: 1,
    price: 1,
    overridePrice: null,
    createdBy: 1,
    updatedBy: 2,
  };

  const mockUpdateDto: UpdateMenuContainerProductAttributeDto = {
    menuContainerProductId: 1,
    posMenuId: 1,
    price: 1,
    overridePrice: null,
    updatedBy: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerProductAttributeController],
      providers: [
        MenuContainerProductAttributeService,
        {
          provide: getRepositoryToken(MenuContainerProductAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerProductAttributeController>(
      MenuContainerProductAttributeController,
    );
    service = module.get<MenuContainerProductAttributeService>(
      MenuContainerProductAttributeService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menu container product attributes', async () => {
      const mockMenuContainerProductAttributes = [
        new MenuContainerProductAttributes(),
      ];
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockMenuContainerProductAttributes);

      expect(await controller.findAll({} as unknown, '1')).toBe(
        mockMenuContainerProductAttributes,
      );

      expect(await controller.findAll({} as unknown, '1')).toEqual(
        mockMenuContainerProductAttributes,
      );

      expect(await controller.findAll({} as unknown, '1')).toStrictEqual(
        mockMenuContainerProductAttributes,
      );
    });

    it('should return an empty array if no menu container product attributes are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      expect(await controller.findAll({} as unknown, '1')).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(
        controller.findAll({} as unknown, '1'),
      ).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a menu container product attribute by ID', async () => {
      const mockMenuContainerProductAttribute =
        new MenuContainerProductAttributes();
      mockMenuContainerProductAttribute.id = 1;
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockMenuContainerProductAttribute);

      expect(await controller.findOne('1', '1')).toBe(
        mockMenuContainerProductAttribute,
      );
    });

    it('should throw an error if menu container product attribute is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      try {
        await controller.findOne('1', '1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a menu container product attribute', async () => {
      const mockMenuContainerProductAttribute =
        new MenuContainerProductAttributes();
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockMenuContainerProductAttribute);

      expect(
        await controller.create(
          mockCreateDto,
          '1',
          1 as unknown as Resto365User,
        ),
      ).toBe(mockMenuContainerProductAttribute);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(
        controller.create(mockCreateDto, '1', 1 as unknown as Resto365User),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a menu container product attribute', async () => {
      const mockMenuContainerProductAttribute =
        new MenuContainerProductAttributes();
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockMenuContainerProductAttribute);

      expect(
        await controller.update(
          '1',
          mockUpdateDto,
          '1',
          {} as unknown as Resto365User,
        ),
      ).toBe(mockMenuContainerProductAttribute);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(
        controller.update(
          '1',
          mockUpdateDto,
          '1',
          {} as unknown as Resto365User,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a menu container product attribute', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1', '1');
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new Error());

      await expect(controller.remove('1', '1')).rejects.toThrowError();
    });
  });
});
