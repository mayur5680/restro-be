import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerOverride } from './entities/menu-container-override.entity';
import { MenuContainerOverrideController } from './menu-container-override.controller';
import { MenuContainerOverrideService } from './menu-container-override.service';

describe('MenuContainerOverrideController', () => {
  let controller: MenuContainerOverrideController;
  let service: MenuContainerOverrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerOverrideController],
      providers: [
        MenuContainerOverrideService,
        {
          provide: getRepositoryToken(MenuContainerOverride),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerOverrideController>(
      MenuContainerOverrideController,
    );
    service = module.get<MenuContainerOverrideService>(
      MenuContainerOverrideService,
    );
  });

  describe('findAll', () => {
    it('should return an array of menuContainerOverrides', async () => {
      const menuContainerOverrides = [
        new MenuContainerOverride(),
        new MenuContainerOverride(),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(menuContainerOverrides);

      const result = await controller.findAll();
      expect(result).toEqual(menuContainerOverrides);
    });

    it('should return an array of menuContainerOverrides by storeId', async () => {
      const menuContainerOverrides = [
        new MenuContainerOverride(),
        new MenuContainerOverride(),
      ];
      jest
        .spyOn(service, 'findAllByStoreId')
        .mockResolvedValue(menuContainerOverrides);

      const result = await controller.findAll('1');
      expect(result).toEqual(menuContainerOverrides);
    });
  });

  describe('findOne', () => {
    it('should return a menuContainerOverride by id', async () => {
      const menuContainerOverride = new MenuContainerOverride();
      jest.spyOn(service, 'findOne').mockResolvedValue(menuContainerOverride);

      const result = await controller.findOne('1');
      expect(result).toEqual(menuContainerOverride);
    });
  });

  describe('create', () => {
    it('should create a menuContainerOverride', async () => {
      const menuContainerOverride = new MenuContainerOverride();
      jest.spyOn(service, 'create').mockResolvedValue(menuContainerOverride);

      const result = await controller.create(menuContainerOverride);
      expect(result).toEqual(menuContainerOverride);
    });
  });

  describe('update', () => {
    it('should update a menuContainerOverride', async () => {
      const menuContainerOverride = new MenuContainerOverride();
      jest.spyOn(service, 'update').mockResolvedValue(menuContainerOverride);

      const result = await controller.update('1', menuContainerOverride);
      expect(result).toEqual(menuContainerOverride);
    });
  });

  describe('remove', () => {
    it('should remove a menuContainerOverride', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove('1');
      expect(result).toEqual(undefined);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
