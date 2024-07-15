import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';

import { Resto365EquipmentSupplierContactService } from './resto365-equipment-supplier-contact.service';
import { Resto365EquipmentSupplierContact } from './entities/resto365-equipment-supplier-contact.entity';
import { CreateResto365EquipmentSupplierContactDto } from './dto/create-resto365-equipment-supplier-contact.dto';
import { UpdateResto365EquipmentSupplierContactDto } from './dto/update-resto365-equipment-supplier-contact.dto';

describe('Resto365EquipmentSupplierContactService', () => {
  let service: Resto365EquipmentSupplierContactService;
  let repository: Repository<Resto365EquipmentSupplierContact>;
  const mockRestoUser = new Resto365User();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Resto365EquipmentSupplierContactService,
        {
          provide: getRepositoryToken(Resto365EquipmentSupplierContact, 'r365'),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Resto365EquipmentSupplierContactService>(
      Resto365EquipmentSupplierContactService,
    );
    repository = module.get<Repository<Resto365EquipmentSupplierContact>>(
      getRepositoryToken(Resto365EquipmentSupplierContact, 'r365'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all equipment supplier contacts', async () => {
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      const mockEquipmentSupplierContacts = [mockEquipmentSupplierContact];
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContacts),
        );
      expect(await service.findAll()).toEqual(mockEquipmentSupplierContacts);
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

  describe('findAllBySupplierId', () => {
    it('should return all equipment supplier contacts by supplier id', async () => {
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      const mockEquipmentSupplierContacts = [mockEquipmentSupplierContact];
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContacts),
        );
      expect(await service.findAllBySupplierIds([1])).toEqual(
        mockEquipmentSupplierContacts,
      );
    });

    it('should throw error', async () => {
      jest.spyOn(repository, 'find').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.findAllBySupplierIds([1]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('findOne', () => {
    it('should return an equipment supplier contact', async () => {
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      expect(await service.findOne(1)).toEqual(mockEquipmentSupplierContact);
    });

    it('should throw NotFoundException', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'Equipment Supplier Contact with ID 1 not found',
        );
      }
    });
  });

  describe('create', () => {
    it('should create an equipment supplier contact', async () => {
      const mockCreateEquipmentSupplierContactDto =
        new CreateResto365EquipmentSupplierContactDto();
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => mockEquipmentSupplierContact);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      expect(
        await service.create(
          mockCreateEquipmentSupplierContactDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toEqual(mockEquipmentSupplierContact);
    });

    it('should throw error', async () => {
      const mockCreateEquipmentSupplierContactDto =
        new CreateResto365EquipmentSupplierContactDto();
      jest.spyOn(repository, 'create').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.create(
          mockCreateEquipmentSupplierContactDto,
          mockRestoUser,
          {} as AuditParams,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('update', () => {
    it('should update an equipment supplier contact', async () => {
      const mockUpdateEquipmentSupplierContactDto =
        new UpdateResto365EquipmentSupplierContactDto();
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      expect(
        await service.update(
          1,
          mockUpdateEquipmentSupplierContactDto,
          mockRestoUser,
          {} as AuditParams,
        ),
      ).toEqual(mockEquipmentSupplierContact);
    });

    it('should throw NotFoundException', async () => {
      const mockUpdateEquipmentSupplierContactDto =
        new UpdateResto365EquipmentSupplierContactDto();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.update(
          1,
          mockUpdateEquipmentSupplierContactDto,
          mockRestoUser,
          {} as AuditParams,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'Equipment Supplier Contact with ID 1 not found',
        );
      }
    });

    it('should throw error', async () => {
      const mockUpdateEquipmentSupplierContactDto =
        new UpdateResto365EquipmentSupplierContactDto();
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      jest.spyOn(repository, 'save').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.update(
          1,
          mockUpdateEquipmentSupplierContactDto,
          mockRestoUser,
          {} as AuditParams,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('remove', () => {
    it('should remove an equipment supplier contact', async () => {
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      jest
        .spyOn(repository, 'remove')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      await service.remove(1);
    });

    it('should throw NotFoundException', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      try {
        await service.remove(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'Equipment Supplier Contact with ID 1 not found',
        );
      }
    });

    it('should throw error', async () => {
      const mockEquipmentSupplierContact =
        new Resto365EquipmentSupplierContact();
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockEquipmentSupplierContact),
        );
      jest.spyOn(repository, 'remove').mockImplementation(() => {
        throw new Error();
      });
      try {
        await service.remove(1);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
