import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Brackets } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { GygLog } from 'src/shared';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

import { CreateStoreSectionTimeSlotOverrideDto } from './dto/create-store-section-time-slot-override.dto';
import { StoreSectionTimeSlotOverride } from './entities/store-section-time-slot-override.entity';
import { Loglevel } from 'src/context';

@Injectable()
export class StoreSectionTimeSlotOverrideService {
  logger: GygLog;
  constructor(
    @InjectRepository(StoreSectionTimeSlotOverride)
    private storeSectionTimeSlotOverrideRepository: Repository<StoreSectionTimeSlotOverride>,
  ) {
    this.logger = new GygLog(StoreSectionTimeSlotOverrideService.name);
  }

  async findOne(id: number): Promise<StoreSectionTimeSlotOverride> {
    try {
      const storeSectionTimeSlotOverride =
        await this.storeSectionTimeSlotOverrideRepository.findOne({
          where: { id },
        });
      if (!storeSectionTimeSlotOverride) {
        throw new NotFoundException(
          `StoreSectionTimeSlotOverride with id ${id} not found`,
        );
      }
      return storeSectionTimeSlotOverride;
    } catch (error) {
      throw error;
    }
  }

  async findAllByStoreSectionTimeSlotId(
    storeSectionTimeSlotId: number,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      return await this.storeSectionTimeSlotOverrideRepository.find({
        where: { storeSectionTimeSlotId },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(
    createStoreSectionTimeSlotOverrideDto: CreateStoreSectionTimeSlotOverrideDto[],
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      const createdOverrides: StoreSectionTimeSlotOverride[] = [];
      for (const dto of createStoreSectionTimeSlotOverrideDto) {
        const existingOverride = await this.checkIfOverrideExists(
          dto.storeSectionTimeSlotId,
          dto.effectiveFrom,
          dto.effectiveTo,
        );
        const overlappingRecords = await this.findOverlapOverrides(
          dto.storeSectionTimeSlotId,
          dto.effectiveFrom,
          dto.effectiveTo,
        );

        if (existingOverride) {
          this.logger.writeLog(
            `StoreSectionTimeSlotOverride with storeSectionTimeSlotId: 
            ${dto.storeSectionTimeSlotId}, openingTime: ${dto.openingTime}, closingTime: ${dto.closingTime}, effectiveFrom: ${dto.effectiveFrom}, 
            effectiveTo: ${dto.effectiveTo} } already exists, hence the record get updated.`,
            null,
            Loglevel.ERROR,
          );
          const updatedOverride = await this.update(
            existingOverride.id,
            dto,
            user,
            auditParams,
          );
          if (updatedOverride) {
            this.logger.writeLog(
              `StoreSectionTimeSlotOverride with storeSectionTimeSlotId: 
              ${dto.storeSectionTimeSlotId}, openingTime: ${dto.openingTime}, closingTime: ${dto.closingTime}, effectiveFrom: ${dto.effectiveFrom}, 
              effectiveTo: ${dto.effectiveTo} } updated successfully.`,
              null,
              Loglevel.INFO,
            );
            createdOverrides.push(updatedOverride);
          }
          continue;
        }

        if (overlappingRecords) {
          this.logger.writeLog(
            `StoreSectionTimeSlotOverride with storeSectionTimeSlotId: 
            ${dto.storeSectionTimeSlotId}, openingTime: ${dto.openingTime}, closingTime: ${dto.closingTime}, effectiveFrom: ${dto.effectiveFrom}, 
            effectiveTo: ${dto.effectiveTo} } overlaps with existing override record, hence the record get updated.`,
            null,
            Loglevel.ERROR,
          );
          const updatedOverride = await this.update(
            overlappingRecords.id,
            dto,
            user,
            auditParams,
          );
          if (updatedOverride) {
            this.logger.writeLog(
              `StoreSectionTimeSlotOverride with storeSectionTimeSlotId: 
              ${dto.storeSectionTimeSlotId}, openingTime: ${dto.openingTime}, closingTime: ${dto.closingTime}, effectiveFrom: ${dto.effectiveFrom}, 
              effectiveTo: ${dto.effectiveTo} } updated successfully.`,
              null,
              Loglevel.INFO,
            );
            createdOverrides.push(updatedOverride);
          }
          continue;
        }
        const newOverride = this.storeSectionTimeSlotOverrideRepository.create({
          ...dto,
          createdBy: user.id,
          updatedBy: user.id,
          ...auditParams,
        });
        const savedOverride =
          await this.storeSectionTimeSlotOverrideRepository.save(newOverride);
        createdOverrides.push(savedOverride);
      }

      return createdOverrides;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateStoreSectionTimeSlotOverrideDto: CreateStoreSectionTimeSlotOverrideDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreSectionTimeSlotOverride> {
    try {
      const storeSectionTimeSlotOverride = await this.findOne(id);
      const updatedOverride = this.storeSectionTimeSlotOverrideRepository.merge(
        storeSectionTimeSlotOverride,
        {
          ...updateStoreSectionTimeSlotOverrideDto,
          updatedBy: user.id,
          ...auditParams,
        },
      );
      return await this.storeSectionTimeSlotOverrideRepository.save(
        updatedOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  public async findByIds(
    ids: number[],
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      return await this.storeSectionTimeSlotOverrideRepository.find({
        where: {
          id: In(ids),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const storeSectionTimeSlotOverride = await this.findOne(id);
      await this.storeSectionTimeSlotOverrideRepository.remove(
        storeSectionTimeSlotOverride,
      );
    } catch (error) {
      throw error;
    }
  }

  // Helper functions--------------------------------------------
  public async checkIfOverrideExists(
    storeSectionTimeSlotId: number,
    effectiveFrom: Date | string,
    effectiveTo: Date | string,
  ): Promise<StoreSectionTimeSlotOverride | undefined> {
    try {
      const effectiveFromDate = new Date(effectiveFrom);
      const effectiveToDate = new Date(effectiveTo);

      if (isNaN(effectiveFromDate.getTime())) {
        throw new Error(`Invalid effectiveFrom date: ${effectiveFrom}`);
      }
      if (isNaN(effectiveToDate.getTime())) {
        throw new Error(`Invalid effectiveTo date: ${effectiveTo}`);
      }

      const existingOverrideRecord =
        await this.storeSectionTimeSlotOverrideRepository.findOne({
          where: {
            storeSectionTimeSlotId,
            effectiveFrom: effectiveFromDate,
            effectiveTo: effectiveToDate,
          },
        });

      return existingOverrideRecord;
    } catch (error) {
      this.logger.writeLog(
        `checkIfOverrideExists: Error querying database`,
        error,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  /*
  Explanation for findOverlapOverrides() function:
    Date Conversion and Validation:
      Convert effectiveFrom and effectiveTo to Date objects and check for validity.
    
    Query Builder for Overlapping Records:

      Use createQueryBuilder to build the query with complex OR conditions.
      The Brackets function allows us to group OR conditions together.
      Ensure to check for current or future records by including (effectiveTo >= CURRENT_DATE OR effectiveFrom >= CURRENT_DATE).
      Define multiple OR conditions for the overlapping date scenarios within another Brackets.
    
      Return Result:
      If any overlapping records are found, the function returns the object to getupdated in the create() function.
   */

  public async findOverlapOverrides(
    storeSectionTimeSlotId: number,
    effectiveFrom: Date | string,
    effectiveTo: Date | string,
  ): Promise<StoreSectionTimeSlotOverride | undefined> {
    try {
      const effectiveFromDate = new Date(effectiveFrom);
      const effectiveToDate = new Date(effectiveTo);

      if (isNaN(effectiveFromDate.getTime())) {
        throw new Error(`Invalid effectiveFrom date: ${effectiveFrom}`);
      }
      if (isNaN(effectiveToDate.getTime())) {
        throw new Error(`Invalid effectiveTo date: ${effectiveTo}`);
      }

      const overlappingRecords =
        await this.storeSectionTimeSlotOverrideRepository
          .createQueryBuilder('override')
          .where('override.storeSectionTimeSlotId = :storeSectionTimeSlotId', {
            storeSectionTimeSlotId,
          })
          .andWhere(
            new Brackets((qb) => {
              qb.where('override.effectiveTo >= CURRENT_DATE').orWhere(
                'override.effectiveFrom >= CURRENT_DATE',
              );
            }),
          )
          .andWhere(
            new Brackets((qb) => {
              qb.where(
                'override.effectiveFrom <= :effectiveFromDate AND override.effectiveTo >= :effectiveToDate',
                {
                  effectiveFromDate,
                  effectiveToDate,
                },
              )
                .orWhere(
                  'override.effectiveFrom >= :effectiveFromDate AND override.effectiveTo <= :effectiveToDate',
                  {
                    effectiveFromDate,
                    effectiveToDate,
                  },
                )
                .orWhere(
                  'override.effectiveFrom >= :effectiveFromDate AND override.effectiveFrom <= :effectiveToDate',
                  {
                    effectiveFromDate,
                    effectiveToDate,
                  },
                )
                .orWhere(
                  'override.effectiveTo >= :effectiveFromDate AND override.effectiveTo <= :effectiveToDate',
                  {
                    effectiveFromDate,
                    effectiveToDate,
                  },
                );
            }),
          )
          .getOne();
      return overlappingRecords;
    } catch (error) {
      this.logger.writeLog(
        `findOverlapOverrides: Error querying database`,
        error,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  public async findOverrideByStoreId(
    storeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<StoreSectionTimeSlotOverride[]> {
    try {
      return await this.storeSectionTimeSlotOverrideRepository
        .createQueryBuilder('storeSectionTimeSlotOverrideRepository')
        .select('storeSectionTimeSlotOverrideRepository')
        .leftJoin(
          'storeSectionTimeSlotOverrideRepository.storeSectionTimeSlot',
          'storeSectionTimeSlot',
        )
        .where('storeSectionTimeSlot.storeId = :storeId', {
          storeId,
        })
        .andWhere(
          '(storeSectionTimeSlotOverrideRepository.effectiveFrom BETWEEN :startDate AND :endDate OR storeSectionTimeSlotOverrideRepository.effectiveTo BETWEEN :startDate AND :endDate)',
          { startDate, endDate },
        )
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
