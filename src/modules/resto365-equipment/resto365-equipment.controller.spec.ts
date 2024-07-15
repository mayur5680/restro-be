import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { Resto365EquipmentController } from './resto365-equipment.controller';
import { Resto365EquipmentService } from './resto365-equipment.service';
import {
  Brand,
  Warranty,
  Resto365Equipment,
} from './entities/resto365-equipment.entity';

import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Resto365Restaurant } from '@modules/resto365-restaurant/entities/resto365-restaurant.entity';
import { Resto365EquipmentSupplier } from '@modules/resto365-equipment-supplier/entities/resto365-equipment-supplier.entity';

class MockResto365RestaurantService {
  async findOne() {
    {
      id: 1;
    }
  }
}

describe('Resto365EquipmentController', () => {
  let controller: Resto365EquipmentController;
  let service: Resto365EquipmentService;
  let repository: Repository<Resto365Equipment>;

  const mockRestoUser = new Resto365User();
  const mockCorrelationId = '76768-88888-88888-8888-8888-88888';

  const mockEquipment: Resto365Equipment[] = [
    {
      id: 1,
      equipmentCategoryId: 1,
      equipment: 'Equipment 1',
      supplierId: 1,
      brand: Brand.Adande,
      model: '',
      description: '',
      quantity: 0,
      warranty: Warranty.OneYear,
      purchaseDate: undefined,
      lastServiceDate: undefined,
      nextServiceDate: undefined,
      servicePeriod: '',
      comments: '',
      restaurantId: 0,
      restaurant: new Resto365Restaurant(),
      _metadata: {
        auditUser: new Resto365User(),
        correlationId: mockCorrelationId,
      },
      createdAt: undefined,
      createdBy: 0,
      updatedAt: undefined,
      updatedBy: 0,
      supplier: new Resto365EquipmentSupplier(),
    },
    {
      id: 2,
      equipmentCategoryId: 1,
      equipment: 'Equipment 2',
      supplierId: 1,
      brand: Brand.Adande,
      model: '',
      description: '',
      quantity: 0,
      warranty: Warranty.OneYear,
      purchaseDate: undefined,
      lastServiceDate: undefined,
      nextServiceDate: undefined,
      servicePeriod: '',
      comments: '',
      restaurantId: 0,
      restaurant: new Resto365Restaurant(),
      _metadata: {
        auditUser: new Resto365User(),
        correlationId: mockCorrelationId,
      },
      createdAt: undefined,
      createdBy: 0,
      updatedAt: undefined,
      updatedBy: 0,
      supplier: new Resto365EquipmentSupplier(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365EquipmentController],
      providers: [
        Resto365EquipmentService,
        {
          provide: getRepositoryToken(Resto365Equipment, 'r365'),
          useClass: Repository,
        },
        {
          provide: Resto365RestaurantService,
          useClass: MockResto365RestaurantService,
        },
      ],
    }).compile();

    controller = module.get<Resto365EquipmentController>(
      Resto365EquipmentController,
    );
    service = module.get<Resto365EquipmentService>(Resto365EquipmentService);
    repository = module.get<Repository<Resto365Equipment>>(
      getRepositoryToken(Resto365Equipment, 'r365'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of equipment', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockEquipment);

      expect(await controller.findAll(mockCorrelationId, mockRestoUser)).toBe(
        mockEquipment,
      );
    });

    it('should return an empty array if no equipment are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      const result = await controller.findAll(mockCorrelationId, mockRestoUser);
      expect(result).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      await expect(
        controller.findAll(mockCorrelationId, mockRestoUser),
      ).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('should return a single equipment', async () => {
      const equipmentId = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockEquipment[0]);

      expect(
        await controller.findOne(equipmentId, mockCorrelationId, mockRestoUser),
      ).toBe(mockEquipment[0]);
    });

    it('should throw NotFoundException if equipment is not found', async () => {
      const equipmentId = 999;
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        controller.findOne(equipmentId, mockCorrelationId, mockRestoUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
