import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { Resto365EquipmentSupplierContact } from './entities/resto365-equipment-supplier-contact.entity';
import { CreateResto365EquipmentSupplierContactDto } from './dto/create-resto365-equipment-supplier-contact.dto';
import { UpdateResto365EquipmentSupplierContactDto } from './dto/update-resto365-equipment-supplier-contact.dto';

@Injectable()
export class Resto365EquipmentSupplierContactService {
  constructor(
    @InjectRepository(Resto365EquipmentSupplierContact, 'r365')
    private readonly equipmentSupplierContactRepository: Repository<Resto365EquipmentSupplierContact>,
  ) {}

  async findAll(): Promise<Resto365EquipmentSupplierContact[]> {
    try {
      const result = await this.equipmentSupplierContactRepository.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAllBySupplierIds(
    supplierIds: number[],
  ): Promise<Resto365EquipmentSupplierContact[]> {
    try {
      const result = await this.equipmentSupplierContactRepository.find({
        where: { supplierId: In(supplierIds) },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Resto365EquipmentSupplierContact> {
    try {
      const equipmentSupplierContact =
        await this.equipmentSupplierContactRepository.findOne({
          where: { id },
        });
      if (!equipmentSupplierContact) {
        throw new NotFoundException(
          `Equipment Supplier Contact with ID ${id} not found`,
        );
      }
      return equipmentSupplierContact;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createEquipmentSupplierContactDto: CreateResto365EquipmentSupplierContactDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365EquipmentSupplierContact> {
    try {
      const equipmentSupplierContact =
        this.equipmentSupplierContactRepository.create({
          ...createEquipmentSupplierContactDto,
          createdBy: user.id,
          updatedBy: user.id,
          ...auditParams,
        });
      const result = await this.equipmentSupplierContactRepository.save(
        equipmentSupplierContact,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateEquipmentSupplierContactDto: UpdateResto365EquipmentSupplierContactDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365EquipmentSupplierContact> {
    try {
      const equipmentSupplierContact =
        await this.equipmentSupplierContactRepository.findOne({
          where: { id },
        });
      if (!equipmentSupplierContact) {
        throw new NotFoundException(
          `Equipment Supplier Contact with ID ${id} not found`,
        );
      }
      const updatedEquipmentSupplierContact = {
        ...equipmentSupplierContact,
        ...updateEquipmentSupplierContactDto,
        updatedBy: user.id,
        ...auditParams,
      };
      const result = await this.equipmentSupplierContactRepository.save(
        updatedEquipmentSupplierContact,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const equipmentSupplierContact =
        await this.equipmentSupplierContactRepository.findOne({
          where: { id },
        });
      if (!equipmentSupplierContact) {
        throw new NotFoundException(
          `Equipment Supplier Contact with ID ${id} not found`,
        );
      }
      await this.equipmentSupplierContactRepository.remove(
        equipmentSupplierContact,
      );
    } catch (error) {
      throw error;
    }
  }
}
