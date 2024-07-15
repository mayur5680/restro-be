import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateSectionContainerController } from './menu-template-section-container.controller';
import { MenuTemplateSectionContainerService } from './menu-template-section-container.service';
import { CreateMenuTemplateSectionContainerDto } from './dto/create-menu-template-section-container.dto';
import { UpdateMenuTemplateSectionContainerDto } from './dto/update-menu-template-section-container.dto';
import { MenuTemplateSectionContainer } from './entities/menu-template-section-container.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Log } from 'src/shared';

describe('MenuTemplateSectionContainerController', () => {
  let controller: MenuTemplateSectionContainerController;
  let service: MenuTemplateSectionContainerService;

  const mockCreateDto: CreateMenuTemplateSectionContainerDto = {
    menuTemplateSectionId: 1,
    menuContainerPosPlu: 1,
    isActive: true,
    createdBy: 1,
    updatedBy: 2,
  };

  const mockUpdateDto: UpdateMenuTemplateSectionContainerDto = {
    menuTemplateSectionId: 1,
    menuContainerPosPlu: 1,
    isActive: true,
    updatedBy: 2,
  };

  beforeAll(() => {
    Log.logInit();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTemplateSectionContainerController],
      providers: [
        MenuTemplateSectionContainerService,
        {
          provide: getRepositoryToken(MenuTemplateSectionContainer),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuTemplateSectionContainerController>(
      MenuTemplateSectionContainerController,
    );
    service = module.get<MenuTemplateSectionContainerService>(
      MenuTemplateSectionContainerService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of menu template section containers', async () => {
      const mockMenuTemplateSectionContainers = [
        new MenuTemplateSectionContainer(),
      ];
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockMenuTemplateSectionContainers);

      const result = await controller.findAll();
      expect(result).toEqual(mockMenuTemplateSectionContainers);
    });

    it('should return an empty array if no menu template section containers are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a menu template section container by ID', async () => {
      const mockMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      mockMenuTemplateSectionContainer.id = 1;
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockMenuTemplateSectionContainer);

      const result = await controller.findOne(1, 'corelationId'); // Add the second argument
      expect(result).toEqual(mockMenuTemplateSectionContainer);
    });

    it('should return undefined if no menu template section container is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne(1, 'corelationId');
      expect(result).toBeUndefined();
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error());

      await expect(
        controller.findOne(1, 'corelationId'),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a menu template section container', async () => {
      const mockMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockMenuTemplateSectionContainer);

      const result = await controller.create(mockCreateDto);
      expect(result).toEqual(mockMenuTemplateSectionContainer);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(mockCreateDto)).rejects.toThrowError();
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(mockCreateDto)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a menu template section container', async () => {
      const mockMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockMenuTemplateSectionContainer);

      const result = await controller.update(1, mockUpdateDto, 'corelationId'); // Add the second argument
      expect(result).toEqual(mockMenuTemplateSectionContainer);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(
        controller.update(1, mockUpdateDto, 'corelationId'),
      ).rejects.toThrowError();
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(
        controller.update(1, mockUpdateDto, 'corelationId'),
      ).rejects.toThrowError();
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error());

      await expect(
        controller.update(1, mockUpdateDto, 'corelationId'),
      ).rejects.toThrowError();
    });
  });
});
