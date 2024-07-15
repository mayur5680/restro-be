import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerController } from './menu-container.controller';
import { MenuContainerService } from './menu-container.service';
import { MenuContainer } from './entities/menu-container.entity';
import { CreateMenuContainerDto } from './dto/create-menu-container.dto';
import { UpdateMenuContainerDto } from './dto/update-menu-container.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MenuContainerController', () => {
  let controller: MenuContainerController;
  let service: MenuContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuContainerController],
      providers: [
        MenuContainerService,
        {
          provide: getRepositoryToken(MenuContainer),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuContainerController>(MenuContainerController);
    service = module.get<MenuContainerService>(MenuContainerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu container', async () => {
      const createDto: CreateMenuContainerDto = {
        name: 'Test Container',
        createdBy: 1,
      };
      const createdMenuContainer: MenuContainer = {
        id: 1,
        name: 'Test Container',
        createdBy: 1,
      } as MenuContainer;
      jest.spyOn(service, 'create').mockResolvedValue(createdMenuContainer);

      const result = await controller.create(createDto);

      expect(result).toEqual(createdMenuContainer);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of menu containers', async () => {
      const menuContainers: MenuContainer[] = [
        { id: 1, name: 'Container 1', createdBy: 1 },
        { id: 2, name: 'Container 2', createdBy: 1 },
      ] as MenuContainer[]; // Cast to MenuContainer[]
      jest.spyOn(service, 'findAll').mockResolvedValue(menuContainers);

      const result = await controller.findAll();

      expect(result).toEqual(menuContainers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a menu container by ID', async () => {
      const menuContainerId = 1;
      const menuContainer: MenuContainer = {
        id: menuContainerId,
        name: 'Test Container',
        createdBy: 1,
      } as MenuContainer; // Cast to MenuContainer
      jest.spyOn(service, 'findOne').mockResolvedValue(menuContainer);

      const result = await controller.findOne(menuContainerId);

      expect(result).toEqual(menuContainer);
      expect(service.findOne).toHaveBeenCalledWith(menuContainerId);
    });
  });

  describe('update', () => {
    it('should update a menu container by ID', async () => {
      const menuContainerId = 1;
      const updateDto: UpdateMenuContainerDto = {
        name: 'Updated Container',
      };
      const updatedMenuContainer: MenuContainer = {
        id: menuContainerId,
        name: 'Updated Container',
        createdBy: 1,
      } as MenuContainer; // Cast to MenuContainer
      jest.spyOn(service, 'update').mockResolvedValue(updatedMenuContainer);

      const result = await controller.update(menuContainerId, updateDto);

      expect(result).toEqual(updatedMenuContainer);
      expect(service.update).toHaveBeenCalledWith(menuContainerId, updateDto);
    });
  });

  describe.skip('remove', () => {
    it('should remove a menu container by ID', async () => {
      const menuContainerId = 1;
      const existingMenuContainer = new MenuContainer();
      jest.spyOn(service, 'findOne').mockResolvedValue(existingMenuContainer);
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(menuContainerId);

      expect(service.findOne).toHaveBeenCalledWith(menuContainerId);
      expect(service.remove).toHaveBeenCalledWith(existingMenuContainer);

      // Ensure the findOne mock is called after the remove method
      expect(service.findOne).toHaveBeenCalledWith(menuContainerId);
      expect(service.findOne).toHaveBeenCalledTimes(2);
    });
  });
});
