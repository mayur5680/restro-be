import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

import { Resto365EquipmentService } from './resto365-equipment.service';
import { CreateResto365EquipmentDto } from './dto/create-resto365-equipment.dto';
import { UpdateResto365EquipmentDto } from './dto/update-resto365-equipment.dto';
import {
  Brand,
  Warranty,
  Resto365Equipment,
} from './entities/resto365-equipment.entity';

describe('Resto365EquipmentService', () => {
  let service: Resto365EquipmentService;
  let repository: Repository<Resto365Equipment>;
  const mockRestoUser = new Resto365User();

  const createEquipmentDto: CreateResto365EquipmentDto = {
    equipment: 'Test Equipment',
    equipmentCategoryId: 1,
    brand: Brand.Taylor,
    warranty: Warranty.OneYear,
    supplierId: 1,
    model: '',
    description: '',
    quantity: 0,
    purchaseDate: undefined,
    lastServiceDate: undefined,
    nextServiceDate: undefined,
    servicePeriod: '',
    comments: '',
    restaurantId: 1,
  };

  const mockUpdateEquipmentDto: UpdateResto365EquipmentDto = {
    equipment: 'Test Equipment',
    brand: Brand.Taylor,
    equipmentCategoryId: 1,
    warranty: Warranty.OneYear,
    supplierId: 1,
    model: '',
    description: '',
    quantity: 0,
    purchaseDate: undefined,
    lastServiceDate: undefined,
    nextServiceDate: undefined,
    servicePeriod: '',
    comments: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365EquipmentService,
        {
          provide: getRepositoryToken(Resto365Equipment, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365EquipmentService>(Resto365EquipmentService);
    repository = module.get<Repository<Resto365Equipment>>(
      getRepositoryToken(Resto365Equipment, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of equipments', async () => {
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.findAll()).toBe(equipments);
    });

    it('should return an empty array if no equipments are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.findAll()).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('should return a single equipment', async () => {
      const equipmentId = 1;
      const equipment = new Resto365Equipment();
      equipment.id = equipmentId;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(equipment);

      expect(await service.findOne(equipmentId)).toBe(equipment);
    });

    it('should throw NotFoundException if equipment is not found', async () => {
      const equipmentId = 999;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(equipmentId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if an error occurs', async () => {
      const equipmentId = 1;
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.findOne(equipmentId)).rejects.toThrow(Error);
    });
  });

  describe('create', () => {
    it('should create a new equipment', async () => {
      const equipment = new Resto365Equipment();
      jest.spyOn(repository, 'create').mockReturnValue(equipment);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(equipment);

      expect(
        await service.create(
          createEquipmentDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toBe(equipment);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw new Error();
      });

      await expect(
        service.create(createEquipmentDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });

    it('should throw an error if an error occurs while saving', async () => {
      const equipment = new Resto365Equipment();
      jest.spyOn(repository, 'create').mockReturnValue(equipment);
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.create(createEquipmentDto, mockRestoUser, {} as AuditParams),
      ).rejects.toThrow(Error);
    });
  });

  describe('update', () => {
    it('should update an equipment', async () => {
      const equipmentId = 1;
      const equipment = new Resto365Equipment();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(equipment);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(equipment);

      expect(
        await service.update(
          equipmentId,
          mockUpdateEquipmentDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toBe(equipment);
    });

    it('should throw NotFoundException if equipment is not found', async () => {
      const equipmentId = 999;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.update(
          equipmentId,
          mockUpdateEquipmentDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if an error occurs', async () => {
      const equipmentId = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(new Resto365Equipment());

      await expect(
        service.update(
          equipmentId,
          mockUpdateEquipmentDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).rejects.toThrow(Error);
    });

    it('should throw an error if an error occurs while saving', async () => {
      const equipmentId = 1;
      const equipment = new Resto365Equipment();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(equipment);
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        service.update(
          equipmentId,
          mockUpdateEquipmentDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).rejects.toThrow(Error);
    });
  });

  describe('remove', () => {
    it('should remove an existing equipment', async () => {
      const equipmentId = 1;
      const equipment = new Resto365Equipment();
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(equipment);
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(undefined);

      expect(await service.remove(equipmentId)).toBeUndefined();
    });

    it('should throw NotFoundException if equipment is not found', async () => {
      const equipmentId = 999;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.remove(equipmentId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if an error occurs', async () => {
      const equipmentId = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(new Resto365Equipment());
      jest.spyOn(repository, 'remove').mockRejectedValueOnce(new Error());

      await expect(service.remove(equipmentId)).rejects.toThrow(Error);
    });
  });

  describe('searchEquipmentByBrand', () => {
    it('should return an array of equipments', async () => {
      const brand = Brand.Taylor;
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.searchEquipmentByBrand(brand)).toBe(equipments);
    });

    it('should return an empty array if no equipments are found', async () => {
      const brand = Brand.Taylor;
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchEquipmentByBrand(brand)).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      const brand = Brand.Taylor;
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.searchEquipmentByBrand(brand)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('searchEquipmentBySupplierId', () => {
    it('should return an array of equipments', async () => {
      const supplierId = 1;
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.searchEquipmentBySupplierId(supplierId)).toBe(
        equipments,
      );
    });

    it('should return an empty array if no equipments are found', async () => {
      const supplierId = 1;
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchEquipmentBySupplierId(supplierId)).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      const supplierId = 1;
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(
        service.searchEquipmentBySupplierId(supplierId),
      ).rejects.toThrow(Error);
    });
  });

  describe('searchEquipmentByModel', () => {
    it('should return an array of equipments', async () => {
      const model = 'Test Model';
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.searchEquipmentByModel(model)).toBe(equipments);
    });

    it('should return an empty array if no equipments are found', async () => {
      const model = 'Test Model';
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchEquipmentByModel(model)).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      const model = 'Test Model';
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.searchEquipmentByModel(model)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('searchEquipmentByWarranty', () => {
    it('should return an array of equipments', async () => {
      const warranty = Warranty.OneYear;
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.searchEquipmentByWarranty(warranty)).toBe(
        equipments,
      );
    });

    it('should return an empty array if no equipments are found', async () => {
      const warranty = Warranty.OneYear;
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchEquipmentByWarranty(warranty)).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      const warranty = Warranty.OneYear;
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(service.searchEquipmentByWarranty(warranty)).rejects.toThrow(
        Error,
      );
    });
  });

  describe('searchEquipmentByRestaurantId', () => {
    it('should return an array of equipments', async () => {
      const restaurantId = 1;
      const equipments: Resto365Equipment[] = [];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(equipments);

      expect(await service.searchEquipmentByRestaurantId(restaurantId)).toBe(
        equipments,
      );
    });

    it('should return an empty array if no equipments are found', async () => {
      const restaurantId = 1;
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      expect(await service.searchEquipmentByRestaurantId(restaurantId)).toEqual(
        [],
      );
    });

    it('should throw an error if an error occurs', async () => {
      const restaurantId = 1;
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(
        service.searchEquipmentByRestaurantId(restaurantId),
      ).rejects.toThrow(Error);
    });
  });
});
