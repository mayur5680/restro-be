import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosMenuService } from './pos-menu.service';
import { PosMenu } from './entities/pos-menu.entity';
import { CreatePosMenuDto } from './dto/create-pos-menu.dto';
import { UpdatePosMenuDto } from './dto/update-pos-menu.dto';

describe('PosMenuService', () => {
  let service: PosMenuService;
  let repository: Repository<PosMenu>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PosMenuService,
        {
          provide: getRepositoryToken(PosMenu),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PosMenuService>(PosMenuService);
    repository = module.get<Repository<PosMenu>>(getRepositoryToken(PosMenu));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of PosMenu', async () => {
      const menus = [new PosMenu()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(menus);

      expect(await service.findAll()).toBe(menus);
    });

    it('should return an empty array if no PosMenu are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAll()).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a PosMenu', async () => {
      const menu = new PosMenu();
      menu.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(menu);

      expect(await service.findOne(1)).toBe(menu);
    });

    it('should throw an error if PosMenu is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(1)).rejects.toThrowError();
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new PosMenu', async () => {
      const createDto: CreatePosMenuDto = {
        name: 'Test Menu',
        description: 'Test Description',
        storeId: 1,
        tier: 1,
        type: 'test',
        createdBy: 1,
        updatedBy: 1,
      };
      const newMenu = new PosMenu();
      newMenu.name = createDto.name;
      jest.spyOn(repository, 'create').mockReturnValueOnce(newMenu);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(newMenu);

      expect(await service.create(createDto)).toBe(newMenu);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        service.create({} as CreatePosMenuDto),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a PosMenu', async () => {
      const updateDto: UpdatePosMenuDto = {
        name: 'Test Menu',
        description: 'Test Description',
        storeId: 1,
        tier: 1,
        type: 'test',
        updatedBy: 1,
      };
      const menu = new PosMenu();
      menu.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(menu);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(menu);

      expect(await service.update(1, updateDto)).toBe(menu);
    });

    it('should throw an error if PosMenu is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.update(1, {} as UpdatePosMenuDto),
      ).rejects.toThrowError();
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(
        service.update(1, {} as UpdatePosMenuDto),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a PosMenu', async () => {
      const menu = new PosMenu();
      menu.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(menu);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(undefined);

      await service.remove(1);
    });

    it('should throw an error if PosMenu is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.remove(1)).rejects.toThrowError();
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.remove(1)).rejects.toThrowError();
    });
  });
});
