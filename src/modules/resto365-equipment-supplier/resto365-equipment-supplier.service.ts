import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { CreateResto365EquipmentSupplierDto } from './dto/create-resto365-equipment-supplier.dto';
import { Resto365EquipmentSupplier } from './entities/resto365-equipment-supplier.entity';

@Injectable()
export class Resto365EquipmentSupplierService {
  constructor(
    @InjectRepository(Resto365EquipmentSupplier, 'r365')
    private readonly equipmentSupplierRepository: Repository<Resto365EquipmentSupplier>,
  ) {}

  async findAll(): Promise<Resto365EquipmentSupplier[]> {
    try {
      const result = await this.equipmentSupplierRepository.find({
        relations: ['contacts'],
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Resto365EquipmentSupplier> {
    try {
      const equipmentSupplier = await this.equipmentSupplierRepository.findOne({
        where: { id },
        relations: ['contacts'],
      });
      if (!equipmentSupplier) {
        throw new NotFoundException(
          `Equipment Supplier with ID ${id} not found`,
        );
      }
      return equipmentSupplier;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createEquipmentSupplierDto: CreateResto365EquipmentSupplierDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<Resto365EquipmentSupplier> {
    try {
      const equipmentSupplier = this.equipmentSupplierRepository.create({
        ...createEquipmentSupplierDto,
        createdBy: user.id,
        updatedBy: user.id,
        ...auditParams,
      });
      const result =
        await this.equipmentSupplierRepository.save(equipmentSupplier);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
