import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { Resto365EquipmentSupplierContactController } from './resto365-equipment-supplier-contact.controller';
import { Resto365EquipmentSupplierContactService } from './resto365-equipment-supplier-contact.service';
import {
  Resto365EquipmentSupplierContact,
  contactType,
} from './entities/resto365-equipment-supplier-contact.entity';
import { CreateResto365EquipmentSupplierContactDto } from './dto/create-resto365-equipment-supplier-contact.dto';
import { UpdateResto365EquipmentSupplierContactDto } from './dto/update-resto365-equipment-supplier-contact.dto';
import { Resto365EquipmentSupplier } from '@modules/resto365-equipment-supplier/entities/resto365-equipment-supplier.entity';

describe('Resto365EquipmentSupplierContactController', () => {
  let controller: Resto365EquipmentSupplierContactController;
  let service: Resto365EquipmentSupplierContactService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Resto365EquipmentSupplierContact>;

  const mockRestoUser = new Resto365User();
  const mockCorrelationId = '76768-88888-88888-8888-8888-88888';

  const mockEquipmentSupplierContact: Resto365EquipmentSupplierContact[] = [
    {
      id: 1,
      supplierId: 1,
      name: 'Supplier Contact 1',
      contactType: contactType.serviceContact,
      contactEmail: 'test@test.com',
      alternateContactNumber: '1234567890',
      _metadata: {
        auditUser: new Resto365User(),
        correlationId: mockCorrelationId,
      },
      createdAt: undefined,
      createdBy: 0,
      updatedAt: undefined,
      updatedBy: 0,
      contactNumber: '',
      supplier: new Resto365EquipmentSupplier(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Resto365EquipmentSupplierContactController],
      providers: [
        Resto365EquipmentSupplierContactService,
        {
          provide: getRepositoryToken(Resto365EquipmentSupplierContact, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<Resto365EquipmentSupplierContactController>(
      Resto365EquipmentSupplierContactController,
    );
    service = module.get<Resto365EquipmentSupplierContactService>(
      Resto365EquipmentSupplierContactService,
    );
    repository = module.get<Repository<Resto365EquipmentSupplierContact>>(
      getRepositoryToken(Resto365EquipmentSupplierContact, 'r365'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of equipment supplier Contacts', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(mockEquipmentSupplierContact);

      expect(await controller.findAll()).toBe(mockEquipmentSupplierContact);
    });

    it('should return an array of equipment supplier Contacts if supplierIds Provided', async () => {
      jest
        .spyOn(service, 'findAllBySupplierIds')
        .mockResolvedValueOnce(mockEquipmentSupplierContact);

      expect(await controller.findAll([1])).toBe(mockEquipmentSupplierContact);
    });

    it('should return an empty array if no equipment supplier Contacts are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an equipment supplier Contact', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(mockEquipmentSupplierContact[0]);

      expect(await controller.findOne(1)).toBe(mockEquipmentSupplierContact[0]);
    });

    it('should throw an error if equipment supplier Contact not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create an equipment supplier Contact', async () => {
      const createEquipmentSupplierContactDto: CreateResto365EquipmentSupplierContactDto =
        {
          supplierId: 1,
          name: 'Supplier Contact 1',
          contactType: contactType.serviceContact,
          contactEmail: 'test@test.com',
          alternateContactNumber: '1234567890',
          contactNumber: '',
        };
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockEquipmentSupplierContact[0]);

      expect(
        await controller.create(
          createEquipmentSupplierContactDto,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).toBe(mockEquipmentSupplierContact[0]);
    });

    it('should throw an error if an error occurs', async () => {
      const createEquipmentSupplierContactDto: CreateResto365EquipmentSupplierContactDto =
        {
          supplierId: 1,
          name: 'Supplier Contact 1',
          contactType: contactType.serviceContact,
          contactEmail: 'test@test.com',
          alternateContactNumber: '1234567890',
          contactNumber: '',
        };
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(
        controller.create(
          createEquipmentSupplierContactDto,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).rejects.toThrow(Error);
    });
  });

  describe('update', () => {
    it('should update an equipment supplier Contact', async () => {
      const updateEquipmentSupplierContactDto: UpdateResto365EquipmentSupplierContactDto =
        {
          name: 'Supplier Contact 1',
          contactType: contactType.serviceContact,
          contactEmail: 'test@test.com',
          alternateContactNumber: '1234567890',
          contactNumber: '',
        };
      jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(mockEquipmentSupplierContact[0]);

      expect(
        await controller.update(
          1,
          updateEquipmentSupplierContactDto,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).toBe(mockEquipmentSupplierContact[0]);
    });

    it('should throw an error if an error occurs', async () => {
      const updateEquipmentSupplierContactDto: UpdateResto365EquipmentSupplierContactDto =
        {
          name: 'Supplier Contact 1',
          contactType: contactType.serviceContact,
          contactEmail: 'test@test.com',
          alternateContactNumber: '1234567890',
          contactNumber: '',
        };
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(
        controller.update(
          1,
          updateEquipmentSupplierContactDto,
          mockRestoUser,
          mockCorrelationId,
        ),
      ).rejects.toThrow(Error);
    });
  });

  describe('remove', () => {
    it('should remove an equipment supplier Contact', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      expect(await controller.remove(1)).toBe(undefined);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      await expect(controller.remove(1)).rejects.toThrow(Error);
    });
  });
});
