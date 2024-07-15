import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerAttributesService } from './menu-container-attributes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerAttributes } from './entities/menu-container-attribute.entity';
import { CreateMenuContainerAttributeDto } from './dto/create-menu-container-attribute.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateMenuContainerAttributeDto } from './dto/update-menu-container-attribute.dto';
import { Log } from 'src/shared';

describe('MenuContainerAttributesService', () => {
  let service: MenuContainerAttributesService;
  let repository: Repository<MenuContainerAttributes>;

  beforeAll(() => {
    Log.logInit();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContainerAttributesService,
        {
          provide: getRepositoryToken(MenuContainerAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuContainerAttributesService>(
      MenuContainerAttributesService,
    );
    repository = module.get<Repository<MenuContainerAttributes>>(
      getRepositoryToken(MenuContainerAttributes),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menu container attributes', async () => {
      const menuContainerAttributes = [
        new MenuContainerAttributes(),
        new MenuContainerAttributes(),
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(menuContainerAttributes);

      expect(await service.findAll('corelationId')).toBe(
        menuContainerAttributes,
      );
    });
  });

  describe('findOne', () => {
    it('should return a menu container attribute', async () => {
      const menuContainerAttribute = new MenuContainerAttributes();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(menuContainerAttribute);

      expect(await service.findOne(1, 'corelationId')).toBe(
        menuContainerAttribute,
      );
    });

    it('should throw a NotFoundException', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1, 'corelationId')).rejects.toThrowError(
        new NotFoundException('MenuContainerAttribute with ID 1 not found'),
      );
    });
  });

  describe('create', () => {
    it('should create a menu container attribute', async () => {
      const createMenuContainerAttributeDto: CreateMenuContainerAttributeDto = {
        menuContainerId: '1',
        posMenuId: '1',
        price: 1,
        overridePrice: 1,
        createdBy: 0,
        updatedBy: 0,
      };
      const menuContainerAttribute = new MenuContainerAttributes();
      jest.spyOn(repository, 'create').mockReturnValue(menuContainerAttribute);
      jest.spyOn(repository, 'save').mockResolvedValue(menuContainerAttribute);

      expect(
        await service.create(createMenuContainerAttributeDto, 'corelationId'),
      ).toBe(menuContainerAttribute);
    });
  });

  describe('update', () => {
    it('should update a menu container attribute', async () => {
      const updateMenuContainerAttributeDto: UpdateMenuContainerAttributeDto = {
        price: 2,
        overridePrice: 2,
      };
      const menuContainerAttribute = new MenuContainerAttributes();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(menuContainerAttribute);
      jest.spyOn(repository, 'save').mockResolvedValue(menuContainerAttribute);

      expect(
        await service.update(
          1,
          updateMenuContainerAttributeDto,
          'corelationId',
        ),
      ).toBe(menuContainerAttribute);
    });

    it('should throw a NotFoundException', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.update(1, { price: 2, overridePrice: 2 }, 'corelationId'),
      ).rejects.toThrowError(
        new NotFoundException('MenuContainerAttribute with ID 1 not found'),
      );
    });
  });
});
