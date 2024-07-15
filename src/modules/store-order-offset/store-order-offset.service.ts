import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { GygLog } from 'src/shared';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Loglevel } from 'src/context';
import { User } from '@modules/auth/UserDecorator';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { UUID } from 'crypto';

import { StoreOrderOffset } from './entities/store-order-offset.entity';
import { CreateStoreOrderOffsetDto } from './dto/create-store-order-offset.dto';
import { UpdateStoreOrderOffsetDto } from './dto/update-store-order-offset.dto';

@Injectable()
export class StoreOrderOffsetService {
  logger: GygLog;
  constructor(
    @InjectRepository(StoreOrderOffset)
    private readonly storeOrderOffsetRepository: Repository<StoreOrderOffset>,
  ) {
    this.logger = new GygLog(StoreOrderOffsetService.name);
  }

  async findAllWithOverrides(
    queryParams: {
      stores?: number[];
    },
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreOrderOffset[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const whereClause: any = {};
      const stores = queryParams.stores
        ? JSON.parse(queryParams.stores.toString())
        : [];
      if (queryParams.stores) {
        whereClause.storeId = In(stores);
      }
      this.logger.writeLog(
        `Finding all StoreOrderOffset`,
        `Finding all StoreOrderOffset for stores ${stores} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffsets = this.storeOrderOffsetRepository.find({
        where: whereClause,
      });
      return storeOrderOffsets;
    } catch (error) {
      throw error;
    }
  }

  async findAllByStoreId(
    storeId: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreOrderOffset[]> {
    try {
      this.logger.writeLog(
        `Finding all StoreOrderOffset`,
        `Finding all StoreOrderOffset for store ${storeId} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffsets = this.storeOrderOffsetRepository.find({
        where: { storeId },
      });
      return storeOrderOffsets;
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<StoreOrderOffset> {
    try {
      this.logger.writeLog(
        `Finding StoreOrderOffset`,
        `Finding StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffset = this.storeOrderOffsetRepository.findOne({
        where: { id },
      });
      if (!storeOrderOffset) {
        this.logger.writeLog(
          `StoreOrderOffset not found`,
          `StoreOrderOffset with id: ${id} not found`,
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException(`StoreOrderOffset with ID ${id} not found`);
      }
      return storeOrderOffset;
    } catch (error) {
      throw error;
    }
  }

  async create(
    createStoreOrderOffsetDto: CreateStoreOrderOffsetDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
    auditParams: AuditParams,
  ): Promise<StoreOrderOffset> {
    try {
      this.logger.writeLog(
        `Creating StoreOrderOffset`,
        `Creating StoreOrderOffset requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffset = this.storeOrderOffsetRepository.create({
        ...createStoreOrderOffsetDto,
        createdBy: user.id,
        updatedBy: user.id,
        ...auditParams,
      });
      await this.storeOrderOffsetRepository.save(storeOrderOffset);
      return storeOrderOffset;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateStoreOrderOffsetDto: UpdateStoreOrderOffsetDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
    auditParams: AuditParams,
  ): Promise<StoreOrderOffset> {
    try {
      this.logger.writeLog(
        `Updating StoreOrderOffset`,
        `Updating StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffset = await this.findOne(id, user, correlationId);

      const updatedStoreOrderOffset = {
        ...storeOrderOffset,
        ...updateStoreOrderOffsetDto,
        updatedBy: user.id,
        ...auditParams,
      };
      return await this.storeOrderOffsetRepository.save(
        updatedStoreOrderOffset,
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(
    id: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<void> {
    try {
      this.logger.writeLog(
        `Deleting StoreOrderOffset`,
        `Deleting StoreOrderOffset with id: ${id} requested by ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const storeOrderOffset = await this.findOne(id, user, correlationId);
      await this.storeOrderOffsetRepository.remove(storeOrderOffset);
    } catch (error) {
      throw error;
    }
  }
}
