import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resto365RestaurantLicence } from './entities/resto365-restaurant-licence.entity';
import { CreateResto365RestaurantLicenceDto } from './dto/create-resto365-restaurant-licence.dto';
import { UpdateResto365RestaurantLicenceDto } from './dto/update-resto365-restaurant-licence.dto';

import { Resto365RestaurantService } from '../resto365-restaurant/resto365-restaurant.service';
import { Resto365User } from '../resto365-user/entities/resto365-user.entity';

import { AuditParams } from 'src/shared/audit-logs.types';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';

import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { UUID } from 'crypto';

@Injectable()
export class Resto365RestaurantLicenceService {
  logger: GygLog;
  constructor(
    @InjectRepository(Resto365RestaurantLicence, 'r365')
    private readonly resto365RestaurantLicenceRepository: Repository<Resto365RestaurantLicence>,
    private readonly resto365RestaurantService: Resto365RestaurantService,
  ) {
    this.logger = new GygLog('Resto365RestaurantLicenceService');
  }

  async findAll(
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
    restaurantId?: number,
    licenceNumber?: string,
  ): Promise<Resto365RestaurantLicence[]> {
    try {
      this.logger.writeLog(
        'Getting all restaurant licences',
        `Getting all restaurant licences requested by user with id ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      let result: Resto365RestaurantLicence[];

      if (restaurantId) {
        result = await this.resto365RestaurantLicenceRepository.find({
          where: { restaurantId: restaurantId },
        });
      } else if (licenceNumber) {
        result = await this.resto365RestaurantLicenceRepository.find({
          where: { licenceNumber: licenceNumber },
        });
      } else {
        result = await this.resto365RestaurantLicenceRepository.find();
      }

      if (!result) {
        this.logger.writeLog(
          'No restaurant licences found',
          'No restaurant licences found',
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException('No restaurant licences found');
      }
      this.logger.writeLog(
        'Restaurant licences found',
        'Restaurant licences found',
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Failed to retrieve restaurant licences',
        `Failed to retrieve restaurant licences: ${error.message}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw new Error(
        `Failed to retrieve restaurant licences: ${error.message}`,
      );
    }
  }

  async findOne(
    id: number,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
    licenceNumber?: string,
  ): Promise<Resto365RestaurantLicence> {
    try {
      this.logger.writeLog(
        'Getting restaurant licence by ID',
        `Getting restaurant licence by ID ${id} requested by user with id ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      let result: Resto365RestaurantLicence;

      if (licenceNumber) {
        result = await this.resto365RestaurantLicenceRepository.findOne({
          where: { licenceNumber },
        });
      } else {
        result = await this.resto365RestaurantLicenceRepository.findOne({
          where: { id },
        });
      }

      if (!result) {
        this.logger.writeLog(
          'Restaurant licence not found',
          `Restaurant licence with ID ${id} not found`,
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException(
          `Restaurant licence with ID ${id} not found`,
        );
      }
      this.logger.writeLog(
        'Restaurant licence found',
        `Restaurant licence with ID ${id} found successfully`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Failed to retrieve restaurant licence',
        `Failed to retrieve restaurant licence with ID ${id}: ${error.message}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw new Error(
        `Failed to retrieve restaurant licence with ID ${id}: ${error.message}`,
      );
    }
  }

  async findAllByRestaurantId(
    restaurantId: number,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365RestaurantLicence[]> {
    try {
      this.logger.writeLog(
        'Getting all restaurant licences by restaurant id',
        `Getting all restaurant licences by restaurant id ${restaurantId} requested by user with id ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = this.resto365RestaurantLicenceRepository.find({
        where: { restaurantId },
      });
      if (!result) {
        this.logger.writeLog(
          'No restaurant licences found',
          `No restaurant licences found for restaurant with id ${restaurantId}`,
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException(
          `No restaurant licences found for restaurant with id ${restaurantId}`,
        );
      }
      this.logger.writeLog(
        'Restaurant licences found',
        `Restaurant licences found for restaurant with id ${restaurantId}`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Failed to retrieve restaurant licences',
        `Failed to retrieve restaurant licences: ${error.message}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw new Error(
        `Failed to retrieve restaurant licences: ${error.message}`,
      );
    }
  }

  async findOneByLicenceNumber(
    licenceNumber: string,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365RestaurantLicence> {
    try {
      this.logger.writeLog(
        'Getting restaurant licence by licence number',
        `Getting restaurant licence by licence number ${licenceNumber} requested by user with id ${user.id}`,
        correlationId,
        Loglevel.INFO,
      );
      const result = this.resto365RestaurantLicenceRepository.findOne({
        where: { licenceNumber },
      });
      if (!result) {
        this.logger.writeLog(
          'Restaurant licence not found',
          `Restaurant licence with licence number ${licenceNumber} not found`,
          correlationId,
          Loglevel.INFO,
        );
        throw new NotFoundException(
          `Restaurant licence with licence number ${licenceNumber} not found`,
        );
      }
      this.logger.writeLog(
        'Restaurant licence found',
        `Restaurant licence with licence number ${licenceNumber} found successfully`,
        correlationId,
        Loglevel.INFO,
      );
      return result;
    } catch (error) {
      this.logger.writeLog(
        'Failed to retrieve restaurant licence',
        `Failed to retrieve restaurant licence with licence number ${licenceNumber}: ${error.message}`,
        correlationId,
        Loglevel.ERROR,
      );
      throw new Error(
        `Failed to retrieve restaurant licence with licence number ${licenceNumber}: ${error.message}`,
      );
    }
  }

  async create(
    createResto365RestaurantLicenceDto: CreateResto365RestaurantLicenceDto,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
    auditParams: AuditParams,
  ): Promise<Resto365RestaurantLicence> {
    this.logger.writeLog(
      'Creating new restaurant licence',
      `Creating new restaurant licence with name ${createResto365RestaurantLicenceDto.licenceName} requested by user with id ${user.id}`,
      correlationId,
      Loglevel.INFO,
    );

    const restaurant = await this.resto365RestaurantService.findOne(
      createResto365RestaurantLicenceDto.restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with id ${createResto365RestaurantLicenceDto.restaurantId} not found`,
      );
    }

    const resto365RestaurantLicence = new Resto365RestaurantLicence();
    resto365RestaurantLicence.licenceName =
      createResto365RestaurantLicenceDto.licenceName;
    resto365RestaurantLicence.licenceNumber =
      createResto365RestaurantLicenceDto.licenceNumber;
    resto365RestaurantLicence.issueDate =
      createResto365RestaurantLicenceDto.issueDate;
    resto365RestaurantLicence.expiryDate =
      createResto365RestaurantLicenceDto.expiryDate;
    resto365RestaurantLicence.renewalNoticePeriodInDays =
      createResto365RestaurantLicenceDto.renewalNoticePeriodInDays;
    resto365RestaurantLicence.comments =
      createResto365RestaurantLicenceDto.comments;
    resto365RestaurantLicence.restaurantId =
      createResto365RestaurantLicenceDto.restaurantId;
    resto365RestaurantLicence.restaurant = restaurant;
    resto365RestaurantLicence.createdBy = user.id;
    resto365RestaurantLicence.updatedBy = user.id;
    resto365RestaurantLicence._metadata = { auditUser: user, correlationId };

    return this.resto365RestaurantLicenceRepository.save({
      ...resto365RestaurantLicence,
      ...auditParams,
    });
  }

  async update(
    id: number,
    updateResto365RestaurantLicenceDto: UpdateResto365RestaurantLicenceDto,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
    auditParams: AuditParams,
  ): Promise<Resto365RestaurantLicence> {
    this.logger.writeLog(
      'Updating restaurant licence',
      `Updating restaurant licence with id ${id}`,
      correlationId,
      Loglevel.INFO,
    );

    const resto365RestaurantLicence =
      await this.resto365RestaurantLicenceRepository.findOne({
        where: { id },
      });

    if (!resto365RestaurantLicence) {
      throw new NotFoundException(`Restaurant licence with id ${id} not found`);
    }

    const restaurant = await this.resto365RestaurantService.findOne(
      resto365RestaurantLicence.restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with id ${updateResto365RestaurantLicenceDto.restaurantId} not found`,
      );
    }

    resto365RestaurantLicence.licenceName =
      updateResto365RestaurantLicenceDto.licenceName ||
      resto365RestaurantLicence.licenceName;
    resto365RestaurantLicence.licenceNumber =
      updateResto365RestaurantLicenceDto.licenceNumber ||
      resto365RestaurantLicence.licenceNumber;
    resto365RestaurantLicence.issueDate =
      updateResto365RestaurantLicenceDto.issueDate ||
      resto365RestaurantLicence.issueDate;
    resto365RestaurantLicence.expiryDate =
      updateResto365RestaurantLicenceDto.expiryDate ||
      resto365RestaurantLicence.expiryDate;
    resto365RestaurantLicence.renewalNoticePeriodInDays =
      updateResto365RestaurantLicenceDto.renewalNoticePeriodInDays ||
      resto365RestaurantLicence.renewalNoticePeriodInDays;
    resto365RestaurantLicence.comments =
      updateResto365RestaurantLicenceDto.comments ||
      resto365RestaurantLicence.comments;
    resto365RestaurantLicence.restaurantId =
      updateResto365RestaurantLicenceDto.restaurantId ||
      resto365RestaurantLicence.restaurantId;
    resto365RestaurantLicence.restaurant = restaurant;
    resto365RestaurantLicence.updatedBy = user.id;
    resto365RestaurantLicence._metadata = { auditUser: user, correlationId };

    return this.resto365RestaurantLicenceRepository.save({
      ...resto365RestaurantLicence,
      ...auditParams,
    });
  }

  async remove(
    id: number,
    user: Resto365User,
    @CorrelationId() correlationId: UUID,
    auditParams: AuditParams,
  ): Promise<void> {
    try {
      const licence = await this.findOne(id, user, correlationId);
      if (!licence) {
        throw new NotFoundException(`Licence with ID ${id} not found`);
      }
      await this.resto365RestaurantLicenceRepository.remove({
        ...licence,
        deletedBy: user.id,
        ...auditParams,
      });
    } catch (error) {
      throw error;
    }
  }
}
