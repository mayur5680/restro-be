import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOperator } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { CreateResto365EquipmentDto } from './dto/create-resto365-equipment.dto';
import { UpdateResto365EquipmentDto } from './dto/update-resto365-equipment.dto';
import {
  Brand,
  Warranty,
  Resto365Equipment,
} from './entities/resto365-equipment.entity';

interface ContactDetails {
  supplier: string;
  name: string;
  contactNumber: string;
  email: string;
}

export interface GroupedContacts {
  serviceContacts: ContactDetails[];
  purchaseContacts: ContactDetails[];
}

@Injectable()
export class Resto365EquipmentService {
  constructor(
    @InjectRepository(Resto365Equipment, 'r365')
    private readonly equipmentRepository: Repository<Resto365Equipment>,
  ) {}

  async findAll(): Promise<Resto365Equipment[]> {
    try {
      const result = await this.equipmentRepository.find({
        relations: ['supplier', 'supplier.contacts'],
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Resto365Equipment> {
    try {
      const equipment = await this.equipmentRepository.findOne({
        where: { id },
        relations: ['supplier', 'supplier.contacts'],
      });
      if (!equipment) {
        throw new NotFoundException(`Equipment with ID ${id} not found`);
      }
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createEquipmentDto: CreateResto365EquipmentDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365Equipment> {
    try {
      const equipment = this.equipmentRepository.create({
        ...createEquipmentDto,
        createdBy: user.id,
        updatedBy: user.id,
        ...auditParams,
      });
      return await this.equipmentRepository.save(equipment);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateEquipmentDto: UpdateResto365EquipmentDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365Equipment> {
    try {
      const equipment = await this.equipmentRepository.findOne({
        where: { id },
      });
      if (!equipment) {
        throw new NotFoundException(`Equipment with ID ${id} not found`);
      }
      const updatedEquipment = {
        ...equipment,
        ...updateEquipmentDto,
        updatedBy: user.id,
        ...auditParams,
      };
      return await this.equipmentRepository.save(updatedEquipment);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const equipment = await this.equipmentRepository.findOne({
        where: { id },
      });
      if (!equipment) {
        throw new NotFoundException(`Equipment with ID ${id} not found`);
      }
      await this.equipmentRepository.remove(equipment);
    } catch (error) {
      throw error;
    }
  }

  async searchEquipmentByBrand(
    brand: Brand | FindOperator<Brand>,
  ): Promise<Resto365Equipment[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        where: { brand },
        relations: ['supplier', 'supplier.contacts'],
      });
      return equipments;
    } catch (error) {
      throw error;
    }
  }

  async searchEquipmentBySupplierId(
    supplierId: number,
  ): Promise<Resto365Equipment[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        where: { supplierId },
        relations: ['supplier', 'supplier.contacts'],
      });
      return equipments;
    } catch (error) {
      throw error;
    }
  }

  async searchEquipmentByModel(model: string): Promise<Resto365Equipment[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        where: { model: ILike(`%${model}%`) },
        relations: ['supplier', 'supplier.contacts'],
      });
      return equipments;
    } catch (error) {
      throw error;
    }
  }

  async searchEquipmentByWarranty(
    warranty: Warranty | FindOperator<Warranty>,
  ): Promise<Resto365Equipment[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        where: { warranty },
        relations: ['supplier', 'supplier.contacts'],
      });
      return equipments;
    } catch (error) {
      throw error;
    }
  }

  async searchEquipmentByRestaurantId(
    restaurantId: number,
  ): Promise<Resto365Equipment[]> {
    try {
      const equipments = await this.equipmentRepository.find({
        where: { restaurantId },
        relations: ['supplier', 'supplier.contacts'],
      });
      return equipments;
    } catch (error) {
      throw error;
    }
  }
}
