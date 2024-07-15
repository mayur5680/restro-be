import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateSectionContainerService } from './menu-template-section-container.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuTemplateSectionContainer } from './entities/menu-template-section-container.entity';
import { CreateMenuTemplateSectionContainerDto } from './dto/create-menu-template-section-container.dto';
import { UpdateMenuTemplateSectionContainerDto } from './dto/update-menu-template-section-container.dto';

describe('MenuTemplateSectionContainerService', () => {
  let service: MenuTemplateSectionContainerService;
  let repository: Repository<MenuTemplateSectionContainer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuTemplateSectionContainerService,
        {
          provide: getRepositoryToken(MenuTemplateSectionContainer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuTemplateSectionContainerService>(
      MenuTemplateSectionContainerService,
    );
    repository = module.get<Repository<MenuTemplateSectionContainer>>(
      getRepositoryToken(MenuTemplateSectionContainer),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new menu template section container', async () => {
      const createDto: CreateMenuTemplateSectionContainerDto = {
        menuTemplateSectionId: 1,
        menuContainerPosPlu: 2,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(expectedMenuTemplateSectionContainer);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedMenuTemplateSectionContainer);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(
        expectedMenuTemplateSectionContainer,
      );
    });

    it('should throw an error if the menu template section container is not created', async () => {
      const createDto: CreateMenuTemplateSectionContainerDto = {
        menuTemplateSectionId: 1,
        menuContainerPosPlu: 2,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };
      jest.spyOn(repository, 'create').mockReturnValue(null);

      await expect(service.create(createDto)).rejects.toThrowError();
    });

    it('should throw an error if the menu template section container is not saved', async () => {
      const createDto: CreateMenuTemplateSectionContainerDto = {
        menuTemplateSectionId: 1,
        menuContainerPosPlu: 2,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(expectedMenuTemplateSectionContainer);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(service.create(createDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return all menu template section containers', async () => {
      const expectedMenuTemplateSectionContainers =
        new Array<MenuTemplateSectionContainer>();
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(expectedMenuTemplateSectionContainers);

      const result = await service.findAll();

      expect(result).toEqual(expectedMenuTemplateSectionContainers);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should throw an error if no menu template section containers are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAll()).resolves.toEqual([]);
    });

    it('should throw an error if an error occurs while fetching menu template section containers', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error());

      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a menu template section container by ID', async () => {
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedMenuTemplateSectionContainer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return undefined if no menu template section container is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(1);

      expect(result).toBeUndefined();
    });

    it('should throw an error if an error occurs while fetching a menu template section container', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValue(new Error());

      await expect(service.findOne(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a menu template section container by ID', async () => {
      const updateDto: UpdateMenuTemplateSectionContainerDto = {
        menuTemplateSectionId: 1,
        menuContainerPosPlu: 2,
        isActive: true,
        updatedBy: 1,
      };
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedMenuTemplateSectionContainer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(
        expectedMenuTemplateSectionContainer,
      );
    });

    it('should throw an error if no menu template section container is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.update(1, {} as CreateMenuTemplateSectionContainerDto),
      ).rejects.toThrowError();
    });

    it('should throw an error if an error occurs while updating a menu template section container', async () => {
      const createDto: CreateMenuTemplateSectionContainerDto = {
        menuTemplateSectionId: 1,
        menuContainerPosPlu: 2,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
      };
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(service.update(1, createDto)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a menu template section container by ID', async () => {
      const id = 1;
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if no menu template section container is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.remove(1)).rejects.toThrowError();
    });

    it('should throw an error if an error occurs while removing a menu template section container', async () => {
      const expectedMenuTemplateSectionContainer =
        new MenuTemplateSectionContainer();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedMenuTemplateSectionContainer);
      jest.spyOn(repository, 'remove').mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrowError();
    });
  });

  describe('findByMenuTemplateSectionId', () => {
    it('should return all menu template section containers by menu template section ID', async () => {
      const expectedMenuTemplateSectionContainers =
        new Array<MenuTemplateSectionContainer>();
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(expectedMenuTemplateSectionContainers);

      const result = await service.findByMenuTemplateSectionId(1);

      expect(result).toEqual(expectedMenuTemplateSectionContainers);
      expect(repository.find).toHaveBeenCalledWith({
        where: { menuTemplateSectionId: 1 },
      });
    });

    it('should throw an error if no menu template section containers are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findByMenuTemplateSectionId(1)).resolves.toEqual([]);
    });

    it('should throw an error if an error occurs while fetching menu template section containers', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error());

      await expect(
        service.findByMenuTemplateSectionId(1),
      ).rejects.toThrowError();
    });
  });

  describe('findByMenuContainerPosPlu', () => {
    it('should return all menu template section containers by menu container pos plu', async () => {
      const expectedMenuTemplateSectionContainers =
        new Array<MenuTemplateSectionContainer>();
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(expectedMenuTemplateSectionContainers);

      const result = await service.findByMenuContainerPosPlu(1);

      expect(result).toEqual(expectedMenuTemplateSectionContainers);
      expect(repository.find).toHaveBeenCalledWith({
        where: { menuContainerPosPlu: 1 },
      });
    });

    it('should throw an error if no menu template section containers are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findByMenuContainerPosPlu(1)).resolves.toEqual([]);
    });

    it('should throw an error if an error occurs while fetching menu template section containers', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error());

      await expect(service.findByMenuContainerPosPlu(1)).rejects.toThrowError();
    });
  });

  describe('findByMenuTemplateSectionIdAndMenuContainerPosPlu', () => {
    it('should return all menu template section containers by menu template section ID and menu container pos plu', async () => {
      const expectedMenuTemplateSectionContainers =
        new Array<MenuTemplateSectionContainer>();
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(expectedMenuTemplateSectionContainers);

      const result =
        await service.findByMenuTemplateSectionIdAndMenuContainerPosPlu(1, 2);

      expect(result).toEqual(expectedMenuTemplateSectionContainers);
      expect(repository.find).toHaveBeenCalledWith({
        where: { menuTemplateSectionId: 1, menuContainerPosPlu: 2 },
      });
    });

    it('should throw an error if no menu template section containers are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findByMenuTemplateSectionIdAndMenuContainerPosPlu(1, 2),
      ).resolves.toEqual([]);
    });

    it('should throw an error if an error occurs while fetching menu template section containers', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error());

      await expect(
        service.findByMenuTemplateSectionIdAndMenuContainerPosPlu(1, 2),
      ).rejects.toThrowError();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
