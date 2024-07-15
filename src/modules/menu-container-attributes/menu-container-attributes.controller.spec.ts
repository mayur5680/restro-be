import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { NotFoundException } from '@nestjs/common';
import { MenuContainerAttributesController } from './menu-container-attributes.controller';
import { MenuContainerAttributesService } from './menu-container-attributes.service';
import { MenuContainerAttributes } from './entities/menu-container-attribute.entity';
import { CreateMenuContainerAttributeDto } from './dto/create-menu-container-attribute.dto';
import { UpdateMenuContainerAttributeDto } from './dto/update-menu-container-attribute.dto';
import { Log } from 'src/shared';

describe('MenuContainerAttributesController', () => {
  let controller: MenuContainerAttributesController;
  let service: MenuContainerAttributesService;

  const mockCreateDto: CreateMenuContainerAttributeDto = {
    menuContainerId: '1',
    posMenuId: '1',
    price: 1,
    overridePrice: 1,
    createdBy: 1,
    updatedBy: 2,
  };

  const mockUpdateDto: UpdateMenuContainerAttributeDto = {
    menuContainerId: '1',
    posMenuId: '1',
    price: 1,
    overridePrice: 1,
    updatedBy: 2,
  };

  beforeAll(() => {
    Log.logInit();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerAttributesController],
      providers: [
        MenuContainerAttributesService,
        {
          provide: getRepositoryToken(MenuContainerAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerAttributesController>(
      MenuContainerAttributesController,
    );
    service = module.get<MenuContainerAttributesService>(
      MenuContainerAttributesService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menu container attributes', async () => {
      const mockMenuContainerAttributes = [
        new MenuContainerAttributes(),
        new MenuContainerAttributes(),
      ];
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockMenuContainerAttributes);

      expect(await controller.findAll('corelationId')).toBe(
        mockMenuContainerAttributes,
      );
    });
  });

  describe('findOne', () => {
    it('should return a menu container attribute', async () => {
      const mockMenuContainerAttribute = new MenuContainerAttributes();
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockMenuContainerAttribute);

      expect(await controller.findOne(1, 'corelationId')).toBe(
        mockMenuContainerAttribute,
      );
    });
  });

  describe('create', () => {
    it('should return a menu container attribute', async () => {
      const mockMenuContainerAttribute = new MenuContainerAttributes();
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockMenuContainerAttribute);

      expect(
        await controller.create(
          mockCreateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).toBe(mockMenuContainerAttribute);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException());

      await expect(
        controller.create(
          mockCreateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return a menu container attribute', async () => {
      const mockMenuContainerAttribute = new MenuContainerAttributes();
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockMenuContainerAttribute);

      expect(
        await controller.update(
          1,
          mockUpdateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).toBe(mockMenuContainerAttribute);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(
        controller.update(
          1,
          mockUpdateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
