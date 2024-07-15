import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { Resto365EquipmentSupplierController } from './resto365-equipment-supplier.controller';
import { Resto365EquipmentSupplierService } from './resto365-equipment-supplier.service';
import { Resto365EquipmentSupplier } from './entities/resto365-equipment-supplier.entity';

describe('Resto365EquipmentSupplierController', () => {
  let controller: Resto365EquipmentSupplierController;
  let service: Resto365EquipmentSupplierService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Resto365EquipmentSupplier>;

  const mockRestoUser = new Resto365User();
  const mockCorrelationId = '76768-88888-88888-8888-8888-88888';

  const mockEquipmentSupplier: Resto365EquipmentSupplier[] = [
    {
      id: 1,
      name: 'Supplier 1',
      _metadata: {
        auditUser: new Resto365User(),
        correlationId: mockCorrelationId,
      },
      createdAt: undefined,
      createdBy: 0,
      updatedAt: undefined,
      updatedBy: 0,
      contacts: [],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365EquipmentSupplierController],
      providers: [
        Resto365EquipmentSupplierService,
        {
          provide: getRepositoryToken(Resto365EquipmentSupplier, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365EquipmentSupplierController>(
      Resto365EquipmentSupplierController,
    );
    service = module.get<Resto365EquipmentSupplierService>(
      Resto365EquipmentSupplierService,
    );
    repository = module.get<Repository<Resto365EquipmentSupplier>>(
      getRepositoryToken(Resto365EquipmentSupplier, 'r365'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of equipment suppliers', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(mockEquipmentSupplier);

      expect(await controller.findAll()).toBe(mockEquipmentSupplier);
    });

    it('should return an empty array if no equipment suppliers are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an equipment supplier', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(mockEquipmentSupplier[0]);

      expect(await controller.findOne(1)).toBe(mockEquipmentSupplier[0]);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);
      try {
        await controller.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create an equipment supplier', async () => {
      const mockCreateEquipmentSupplier = {
        name: 'Supplier 1',
      };
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockEquipmentSupplier[0]);

      expect(
        await controller.create(
          mockCreateEquipmentSupplier,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).toBe(mockEquipmentSupplier[0]);
    });

    it('should throw an error if an error occurs', async () => {
      const mockCreateEquipmentSupplier = {
        name: 'Supplier 1',
      };
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(
        controller.create(
          mockCreateEquipmentSupplier,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).rejects.toThrow(Error);
    });
  });
});
