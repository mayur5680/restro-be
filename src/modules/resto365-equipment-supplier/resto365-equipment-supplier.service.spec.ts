import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

import { Resto365EquipmentSupplier } from './entities/resto365-equipment-supplier.entity';
import { Resto365EquipmentSupplierService } from './resto365-equipment-supplier.service';
import { CreateResto365EquipmentSupplierDto } from './dto/create-resto365-equipment-supplier.dto';

describe('Resto365EquipmentSupplierService', () => {
  let service: Resto365EquipmentSupplierService;
  let repository: Repository<Resto365EquipmentSupplier>;
  const mockRestoUser = new Resto365User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365EquipmentSupplierService,
        {
          provide: getRepositoryToken(Resto365EquipmentSupplier, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365EquipmentSupplierService>(
      Resto365EquipmentSupplierService,
    );
    repository = module.get<Repository<Resto365EquipmentSupplier>>(
      getRepositoryToken(Resto365EquipmentSupplier, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all equipment suppliers', async () => {
      const mockEquipmentSupplier = new Resto365EquipmentSupplier();
      const mockEquipmentSuppliers = [mockEquipmentSupplier];
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(mockEquipmentSuppliers));
      expect(await service.findAll()).toEqual(mockEquipmentSuppliers);
    });

    it('should throw error', async () => {
      jest.spyOn(repository, 'find').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('findOne', () => {
    it('should return an equipment supplier', async () => {
      const mockEquipmentSupplier = new Resto365EquipmentSupplier();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockEquipmentSupplier));
      expect(await service.findOne(1)).toEqual(mockEquipmentSupplier);
    });

    it('should throw NotFoundException', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Equipment Supplier with ID 1 not found');
      }
    });
  });

  describe('create', () => {
    it('should create an equipment supplier', async () => {
      const mockCreateEquipmentSupplierDto =
        new CreateResto365EquipmentSupplierDto();
      const mockEquipmentSupplier = new Resto365EquipmentSupplier();
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => mockEquipmentSupplier);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(mockEquipmentSupplier));
      expect(
        await service.create(
          mockCreateEquipmentSupplierDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toEqual(mockEquipmentSupplier);
    });

    it('should throw error', async () => {
      const mockCreateEquipmentSupplierDto =
        new CreateResto365EquipmentSupplierDto();
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.create(
          mockCreateEquipmentSupplierDto,
          mockRestoUser,
          {} as AuditParams,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
