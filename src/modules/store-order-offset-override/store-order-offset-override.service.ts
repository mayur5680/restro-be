import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStoreOrderOffsetOverrideDto } from './dto/create-store-order-offset-override.dto';
import { UpdateStoreOrderOffsetOverrideDto } from './dto/update-store-order-offset-override.dto';
import { StoreOrderOffsetOverride } from './entities/store-order-offset-override.entity';

import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

@Injectable()
export class StoreOrderOffsetOverrideService {
  constructor(
    @InjectRepository(StoreOrderOffsetOverride)
    private readonly storeOrderOffsetOverrideRepository: Repository<StoreOrderOffsetOverride>,
  ) {}

  async create(
    createStoreOrderOffsetOverrideDto: CreateStoreOrderOffsetOverrideDto[],
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreOrderOffsetOverride[]> {
    try {
      const storeOrderOffsetOverrides = createStoreOrderOffsetOverrideDto.map(
        (storeOrderOffsetOverride) => {
          return {
            ...storeOrderOffsetOverride,
            createdBy: user.id,
            updatedBy: user.id,
            ...auditParams,
          };
        },
      );

      const storeOrderOffsetOverride =
        await this.storeOrderOffsetOverrideRepository.upsert(
          storeOrderOffsetOverrides,
          ['id'],
        );
      const ids = storeOrderOffsetOverride.identifiers.map((id) => id.id);
      return this.findByIds(ids);
    } catch (error) {
      throw error;
    }
  }

  public async findByIds(ids: number[]): Promise<StoreOrderOffsetOverride[]> {
    return await this.storeOrderOffsetOverrideRepository.find({
      where: { id: In(ids) },
    });
  }

  async findAll(): Promise<StoreOrderOffsetOverride[]> {
    return await this.storeOrderOffsetOverrideRepository.find();
  }

  async findAllByStoreIdAndDayOfWeek(queryParams: {
    store: number;
    daysOfWeek?: number[];
  }): Promise<StoreOrderOffsetOverride[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    const store = queryParams.store
      ? JSON.parse(queryParams.store.toString())
      : [];
    const daysOfWeek = queryParams.daysOfWeek
      ? JSON.parse(queryParams.daysOfWeek.toString())
      : [];

    if (queryParams.store) {
      whereClause.storeId = store;
    }

    if (queryParams.daysOfWeek) {
      whereClause.dayOfWeek = In(daysOfWeek);
    }

    return await this.storeOrderOffsetOverrideRepository.find({
      where: whereClause,
    });
  }

  async findOne(id: string): Promise<StoreOrderOffsetOverride> {
    const storeOrderOffsetOverride =
      await this.storeOrderOffsetOverrideRepository.findOne({
        where: { id },
      });
    if (!storeOrderOffsetOverride) {
      throw new NotFoundException(
        `StoreOrderOffsetOverride with ID ${id} not found`,
      );
    }
    return storeOrderOffsetOverride;
  }

  async update(
    id: string,
    updateStoreOrderOffsetOverrideDto: UpdateStoreOrderOffsetOverrideDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreOrderOffsetOverride> {
    try {
      const storeOrderOffsetOverride = await this.findOne(id);

      const updatedStoreOrderOffsetOverride = {
        ...storeOrderOffsetOverride,
        ...updateStoreOrderOffsetOverrideDto,
        updatedBy: user.id,
        ...auditParams,
      };
      return await this.storeOrderOffsetOverrideRepository.save(
        updatedStoreOrderOffsetOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const storeOrderOffsetOverride = await this.findOne(id);
      await this.storeOrderOffsetOverrideRepository.remove(
        storeOrderOffsetOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  async generateUniqueId(): Promise<string> {
    // Generate a random number with up to 9 digits
    const randomNumber = Math.floor(Math.random() * 1000000000);
    const newId: string = randomNumber.toString();

    try {
      // Check if the generated ID already exists
      const existingRecord =
        await this.storeOrderOffsetOverrideRepository.findOne({
          where: { id: newId },
        });
      if (existingRecord) {
        // If the ID already exists, recursively call the function again to generate a new one
        return this.generateUniqueId();
      }
      // If the ID is unique, return it
      return newId;
    } catch (error) {
      throw error;
    }
  }
}
