import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not, And } from 'typeorm';
import { AuditParams } from 'src/shared/audit-logs.types';
import { GygLog } from 'src/shared';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Loglevel } from 'src/context';

import { CreateStoreSectionTimeSlotDto } from './dto/create-store-section-time-slot.dto';
import { StoreSectionTimeSlot } from './entities/store-section-time-slot.entity';
import { UpdateStoreSectionTimeSlotDto } from './dto/update-store-section-time-slot.dto';
import { StoreSectionTimeSlotOverrideService } from '@modules/store-section-time-slot-override/store-section-time-slot-override.service';
import { StoreSectionTimeSlotOverride } from '@modules/store-section-time-slot-override/entities/store-section-time-slot-override.entity';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import {
  filterFromStoreServices,
  SectionList,
  isMiamTimeSlot,
  checkTimeSlotOverlap,
} from './common';

@Injectable()
export class StoreSectionTimeSlotService {
  logger: GygLog;
  constructor(
    @InjectRepository(StoreSectionTimeSlot)
    private storeSectionTimeSlotRepository: Repository<StoreSectionTimeSlot>,
    private readonly storeSectionTimeSlotOverrideService: StoreSectionTimeSlotOverrideService,
    private readonly restaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog(StoreSectionTimeSlotService.name);
  }

  async create(
    createStoreSectionTimeSlotDto: CreateStoreSectionTimeSlotDto[],
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreSectionTimeSlot[]> {
    try {
      const createdRecordss: StoreSectionTimeSlot[] = [];

      for (const dto of createStoreSectionTimeSlotDto) {
        // Checks all timeslots for overlaps before handing over to repository.save
        // Not airtgiht unless we wrap this in a transaction
        // - haritha
        const overlaps = await this.checkStoreSectionTimeslotOverlap(dto);
        if (overlaps) {
          this.logger.error(
            this.create.toString(),
            `StoreSectionTimeSlot overlaps with existing trading hours`,
            null,
          );
          throw new ConflictException(
            'Updated hours overlap with one of more existing trading hours',
          );
        }
      }
      for (const dto of createStoreSectionTimeSlotDto) {
        const existingRecord = await this.checkIfOverrideExists(
          dto.storeId,
          dto.sectionId,
          dto.dayOfWeek,
          dto.openingTime,
          dto.closingTime,
          dto.type,
          dto.isActive,
        );
        if (existingRecord) {
          this.logger.writeLog(
            `StoreSectionTimeSlot with storeId: ${dto.storeId}, sectionId: ${dto.sectionId}, dayOfWeek: ${dto.dayOfWeek}, openingTime: ${dto.openingTime}, closingTime: ${dto.closingTime}, type: ${dto.type}, isActive: ${dto.isActive} already exists`,
            null,
            Loglevel.ERROR,
          );
          continue;
        }
        const createdRecord = await this.storeSectionTimeSlotRepository.save({
          ...dto,
          createdBy: user.id,
          ...auditParams,
        });

        createdRecordss.push(createdRecord);
      }
      return createdRecordss;
    } catch (error) {
      throw error;
    }
  }

  public async findByIds(id: number[]): Promise<StoreSectionTimeSlot[]> {
    return await this.storeSectionTimeSlotRepository.find({
      where: {
        id: In(id),
      },
    });
  }

  async findAllWithOverrides(queryParams: {
    stores?: number[];
    sections?: number[];
    dayOfWeeks?: number[];
  }): Promise<StoreSectionTimeSlot[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const whereClause: any = {};
      const stores = queryParams.stores
        ? JSON.parse(queryParams.stores.toString())
        : [];
      const sections = queryParams.sections
        ? JSON.parse(queryParams.sections.toString())
        : [];
      const dayOfWeeks = queryParams.dayOfWeeks
        ? JSON.parse(queryParams.dayOfWeeks.toString())
        : [];

      if (queryParams.stores) {
        whereClause.storeId = In(stores);
      }

      if (queryParams.sections) {
        whereClause.sectionId = In(sections);
      }

      if (queryParams.dayOfWeeks) {
        whereClause.dayOfWeek = In(dayOfWeeks);
      }

      this.logger.writeLog(
        `Finding all StoreSectionTimeSlot with stores: ${stores}, sections: ${sections}, dayOfWeeks: ${dayOfWeeks}`,
        null,
        Loglevel.DEBUG,
      );

      const storeSectionTimeSlots =
        await this.storeSectionTimeSlotRepository.find({
          where: whereClause,
          relations: ['overrides'],
        });

      return storeSectionTimeSlots;
    } catch (error) {
      throw error;
    }
  }

  async findOneWithOverrides(id: number): Promise<StoreSectionTimeSlot> {
    const storeSectionTimeSlot =
      await this.storeSectionTimeSlotRepository.findOne({
        where: { id },
      });
    if (!storeSectionTimeSlot) {
      throw new NotFoundException(
        `StoreSectionTimeSlot with id ${id} not found`,
      );
    }
    const overrides =
      await this.storeSectionTimeSlotOverrideService.findAllByStoreSectionTimeSlotId(
        id,
      );
    storeSectionTimeSlot.overrides = this.filterOverridesByDateTime(overrides);
    return storeSectionTimeSlot;
  }

  private filterOverridesByDateTime(
    overrides: StoreSectionTimeSlotOverride[],
  ): StoreSectionTimeSlotOverride[] {
    const currentDate = new Date();
    return overrides.filter(
      (override) =>
        override.effectiveFrom <= currentDate ||
        currentDate <= override.effectiveTo,
    );
  }

  async update(
    id: number,
    updateStoreSectionTimeSlotDto: UpdateStoreSectionTimeSlotDto,
    user: Resto365User,
    auditParams: AuditParams,
  ): Promise<StoreSectionTimeSlot> {
    try {
      const storeSectionTimeSlot = await this.findOneWithOverrides(id);
      const updatedStoreSectionTimeSlot = {
        ...storeSectionTimeSlot,
        ...updateStoreSectionTimeSlotDto,
        updatedBy: user.id,
        ...auditParams,
      };

      const overlaps = await this.checkStoreSectionTimeslotOverlap(
        updatedStoreSectionTimeSlot,
      );
      if (overlaps) {
        this.logger.error(
          this.create.toString(),
          `StoreSectionTimeSlot with id ${updatedStoreSectionTimeSlot.id} overlaps with existing trading hours`,
          null,
        );
        throw new ConflictException(
          'Updated hours overlap with one of more existing trading hours',
        );
      }

      return await this.storeSectionTimeSlotRepository.save(
        updatedStoreSectionTimeSlot,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const storeSectionTimeSlot = await this.findOneWithOverrides(id);
      await this.storeSectionTimeSlotRepository.remove(storeSectionTimeSlot);
    } catch (error) {
      throw error;
    }
  }

  private async checkIfOverrideExists(
    storeId: number,
    sectionId: number,
    dayOfWeek: number,
    openingTime: string,
    closingTime: string,
    type: string,
    isActive: boolean,
  ): Promise<StoreSectionTimeSlot | undefined> {
    try {
      const existingRecord = await this.storeSectionTimeSlotRepository.findOne({
        where: {
          storeId,
          sectionId,
          dayOfWeek,
          openingTime,
          closingTime,
          type,
          isActive,
        },
      });
      return existingRecord;
    } catch (error) {
      throw error;
    }
  }
  async checkStoreSectionTimeslotOverlap(currentTimeSlot: {
    isActive: boolean;
    storeId: number;
    dayOfWeek: number;
    openingTime: string;
    closingTime: string;
    sectionId: number;
    id?: number;
  }) {
    // We do not check for overlaps if the updating time slot,
    // - is not active
    // - is in a MIAM section
    if (!currentTimeSlot.isActive || isMiamTimeSlot(currentTimeSlot)) {
      return false;
    }
    const restaurant = await this.restaurantService.findOneByBhyveId(
      currentTimeSlot.storeId.toString(),
    );
    // Gets,
    // - Any active time slots
    // - Except the updating time slot
    // - Across all menu sections
    // - For the same day of week
    // - For the same store
    // - Not in MIAM sections
    // - Filters any time slots disabled from store services
    const existingStoreSectionTimeSlots = filterFromStoreServices(
      restaurant,
      await this.storeSectionTimeSlotRepository.find({
        where: {
          // emit id prop only if currentTimeSlot.id exists
          ...(currentTimeSlot.id ? { id: Not(currentTimeSlot.id) } : {}),
          isActive: true,
          storeId: currentTimeSlot.storeId,
          dayOfWeek: currentTimeSlot.dayOfWeek,
          sectionId: And(
            Not(In([SectionList.BreakfastMIAM, SectionList.MainmenuMIAM])),
          ),
        },
        // cache this query as it could be used in a tight loop (e.g. bulk create)
        cache: true,
      }),
    );
    const overlaps = await checkTimeSlotOverlap(
      currentTimeSlot,
      existingStoreSectionTimeSlots,
    );
    return overlaps;
  }
}
