import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreSurchargeDto } from './dto/create-store-surcharge.dto';
import { UpdateStoreSurchargeDto } from './dto/update-store-surcharge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreSurcharge } from './entities/store-surcharge.entity';
import { Repository } from 'typeorm';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';
import { CreateStoreSurchargeBulkDto } from './dto/create-store-surcharge-bulk.dto';
import { Store } from '@modules/store/entities/store.entity';
import moment from 'moment-timezone';

@Injectable()
export class StoreSurchargeService {
  constructor(
    @InjectRepository(StoreSurcharge)
    private readonly storeSurchargeRepository: Repository<StoreSurcharge>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}
  async create(createStoreSurchargeDto: CreateStoreSurchargeDto) {
    const store = await this.storeRepository.findOne({
      where: { id: createStoreSurchargeDto.storeId },
    });

    if (!store) {
      throw new BadRequestException(
        `Invalid Store: ${createStoreSurchargeDto.storeId}`,
      );
    }

    const data = {
      ...createStoreSurchargeDto,
      startDateTime: moment(createStoreSurchargeDto.startDateTime)
        .tz(store.timeZone)
        .toISOString(),
      endDateTime: moment(createStoreSurchargeDto.endDateTime)
        .tz(store.timeZone)
        .toISOString(),
      createdBy: 1, // @TODO: Get the current user ID
    };

    const createdStoreSurcharge = this.storeSurchargeRepository.create(data);

    await this.storeSurchargeRepository.save(createdStoreSurcharge);

    return createdStoreSurcharge;
  }

  async createBulk(createStoreSurchargeBulkDto: CreateStoreSurchargeBulkDto) {
    const where =
      createStoreSurchargeBulkDto.state !== 'all'
        ? { state: createStoreSurchargeBulkDto.state }
        : {};

    const stores = await this.storeRepository.find({ where });

    const {
      name,
      description,
      startDateTime,
      endDateTime,
      isActive,
      isVisibleForCustomer,
      definitionId,
      posPlu,
      surchargePercentage,
      surchargeAmount,
    } = createStoreSurchargeBulkDto;

    const data = stores
      .filter((s) => s.timeZone) // Filter out stores which don't have a timezone
      .map((store: Store) => {
        return {
          name,
          description,
          storeId: store.id,
          startDateTime: moment(startDateTime).tz(store.timeZone).toISOString(),
          endDateTime: moment(endDateTime).tz(store.timeZone).toISOString(),
          isActive,
          isVisibleForCustomer,
          definitionId,
          posPlu,
          surchargePercentage,
          surchargeAmount,
          createdBy: 1, // @TODO: Get the current user ID
        };
      });

    const createdStoreSurcharges = this.storeSurchargeRepository.create(data);

    await this.storeSurchargeRepository.insert(createdStoreSurcharges);
    return {};
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const [result, total] = await this.storeSurchargeRepository.findAndCount({
      where,
      take,
      skip,
      order,
      relations: {
        store: true,
      },
    });

    return {
      data: result,
      meta: {
        totalRows: total,
        pages: Math.ceil(total / take),
      },
    };
  }

  async findOne(id: string) {
    const result = await this.storeSurchargeRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Store Surcharge with ID ${id} not found.`);
    }

    return result;
  }

  async update(id: string, updateStoreSurchargeDto: UpdateStoreSurchargeDto) {
    const store = await this.storeRepository.findOne({
      where: { id: updateStoreSurchargeDto.storeId },
    });

    const data = {
      ...updateStoreSurchargeDto,
      startDateTime: moment(updateStoreSurchargeDto.startDateTime)
        .tz(store.timeZone)
        .toISOString(),
      endDateTime: moment(updateStoreSurchargeDto.endDateTime)
        .tz(store.timeZone)
        .toISOString(),
      updatedBy: 1, // @TODO: Get the current user ID
    };

    const result = await this.storeSurchargeRepository.update({ id }, data);

    if (result.affected === 0) {
      throw new NotFoundException(`Store Surcharge with ID ${id} not found.`);
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} storeSurcharge`;
  }
}
