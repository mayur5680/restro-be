import { Test, TestingModule } from '@nestjs/testing';
import { MenuContainerProductAttributeService } from './menu-container-product-attribute.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuContainerProductAttributes } from './entities/menu-container-product-attribute.entity';
import { CreateMenuContainerProductAttributeDto } from './dto/create-menu-container-product-attribute.dto';
import { UpdateMenuContainerProductAttributeDto } from './dto/update-menu-container-product-attribute.dto';

describe('MenuContainerProductAttributeService', () => {
  let service: MenuContainerProductAttributeService;
  let repository: Repository<MenuContainerProductAttributes>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuContainerProductAttributeService,
        {
          provide: getRepositoryToken(MenuContainerProductAttributes),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuContainerProductAttributeService>(
      MenuContainerProductAttributeService,
    );
    repository = module.get<Repository<MenuContainerProductAttributes>>(
      getRepositoryToken(MenuContainerProductAttributes),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of MenuContainerProductAttributes', async () => {
      const attributes = [new MenuContainerProductAttributes()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(attributes);

      expect(await service.findAll()).toBe(attributes);
    });

    it('should return an empty array if no attributes are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAll()).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a MenuContainerProductAttributes', async () => {
      const attribute = new MenuContainerProductAttributes();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(attribute);

      expect(await service.findOne(1)).toBe(attribute);
    });

    it('should return undefined if no attribute is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      expect(await service.findOne(1)).toBeUndefined();
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a MenuContainerProductAttributes', async () => {
      const createDto = new CreateMenuContainerProductAttributeDto();
      const attribute = new MenuContainerProductAttributes();
      jest.spyOn(repository, 'create').mockReturnValueOnce(attribute);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(attribute);

      expect(await service.create(createDto)).toBe(attribute);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        service.create(new CreateMenuContainerProductAttributeDto()),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a MenuContainerProductAttributes', async () => {
      const updateDto = new UpdateMenuContainerProductAttributeDto();
      const attribute = new MenuContainerProductAttributes();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(attribute);
      jest.spyOn(repository, 'merge').mockReturnValueOnce(attribute);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(attribute);

      expect(await service.update(1, updateDto)).toBe(attribute);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(
        service.update(1, new UpdateMenuContainerProductAttributeDto()),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a MenuContainerProductAttributes', async () => {
      const attribute = new MenuContainerProductAttributes();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(attribute);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(undefined);

      await service.remove(1);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.remove(1)).rejects.toThrowError();
    });
  });

  describe('findAllByMenuContainerProductId', () => {
    it('should return an array of MenuContainerProductAttributes', async () => {
      const attributes = [new MenuContainerProductAttributes()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(attributes);

      expect(await service.findAllByMenuContainerProductId(1)).toBe(attributes);
    });

    it('should return an empty array if no attributes are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAllByMenuContainerProductId(1)).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(
        service.findAllByMenuContainerProductId(1),
      ).rejects.toThrowError();
    });
  });

  describe('findAllByPosMenuId', () => {
    it('should return an array of MenuContainerProductAttributes', async () => {
      const attributes = [new MenuContainerProductAttributes()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(attributes);

      expect(await service.findAllByPosMenuId(1)).toBe(attributes);
    });

    it('should return an empty array if no attributes are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAllByPosMenuId(1)).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAllByPosMenuId(1)).rejects.toThrowError();
    });
  });
});
