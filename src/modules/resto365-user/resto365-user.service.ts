/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, Logger } from '@nestjs/common';
import { CreateResto365UserDto } from './dto/create-resto365-user.dto';
import { UpdateResto365UserDto } from './dto/update-resto365-user.dto';
import { EntityManager, In, Like, Repository } from 'typeorm';
import { Resto365User } from './entities/resto365-user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Resto365CountryService } from '@modules/resto365-country/resto365-country.service';
import { OktaUserService } from '@modules/okta-user/okta-user.service';
import { Resto365AreaService } from '@modules/resto365-area/resto365-area.service';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { isEmpty } from 'lodash';
import { AuditParams } from 'src/shared/audit-logs.types';

@Injectable()
export class Resto365UserService {
  private readonly pageSize = 10;
  constructor(
    @InjectRepository(Resto365User, 'r365')
    private r365UserRepository: Repository<Resto365User>,
    private r365CountryService: Resto365CountryService,
    private r365AreaService: Resto365AreaService,
    private r365RestaurantService: Resto365RestaurantService,
    private oktaUserService: OktaUserService,
    @InjectEntityManager('r365') private entityManager: EntityManager,
  ) {}
  async create(
    createResto365UserDto: CreateResto365UserDto,
    user: Resto365User,
    auditParams: AuditParams,
  ) {
    try {
      return await this.entityManager.transaction(async (manager) => {
        const r365User = new Resto365User();
        r365User.email = createResto365UserDto.email;
        r365User.name = createResto365UserDto.name;
        r365User.oktaId = createResto365UserDto.oktaId;
        r365User.roleId = createResto365UserDto.roleId;
        r365User.department = createResto365UserDto.department;
        r365User.phone = createResto365UserDto.phone;
        r365User.createdBy = user.id;
        r365User.countries = await this.r365CountryService.findByNames(
          createResto365UserDto.countries as string[],
        );
        if (createResto365UserDto.areaId != null) {
          r365User.areas = [
            await this.r365AreaService.findOne(createResto365UserDto.areaId),
          ];
        }
        if (!isEmpty(createResto365UserDto.restaurantIds)) {
          r365User.restaurants = await this.r365RestaurantService.findByIds(
            createResto365UserDto.restaurantIds,
          );
        }
        await this.oktaUserService.assignUserToOktaApp(r365User.oktaId);
        return manager
          .getRepository(Resto365User)
          .save({ ...r365User, ...auditParams });
      });
    } catch (error) {
      Logger.error(
        `User creation failed with ${error} for ${createResto365UserDto.email}`,
      );
      // DO not wrap with exceptionWrapper as it masks the actual error
      throw error;
    }
  }

  findAll(name: string, roleId: number, page: number) {
    const relations = ['role', 'countries', 'restaurants', 'areas'];

    return this.r365UserRepository.find({
      where: {
        ...(name != null ? { name: Like(`%${name}%`) } : {}),
        ...(roleId != null ? { roleId } : {}),
      },
      skip: (page - 1) * this.pageSize,
      take: this.pageSize,
      relations,
    });
  }

  count(name: string, roleId: number) {
    return this.r365UserRepository.count({
      where: {
        ...(name != null ? { name: Like(`%${name}%`) } : {}),
        ...(roleId != null ? { roleId } : {}),
      },
    });
  }

  findOne(id: number) {
    return this.r365UserRepository.findOne({
      where: { id },
      relations: ['role', 'countries', 'restaurants', 'areas'],
    });
  }

  findByOktaId(oktaId: string) {
    return this.r365UserRepository.findOne({
      where: { oktaId },
      relations: ['role', 'countries', 'restaurants', 'areas'],
    });
  }

  findByEmail(email: string) {
    return this.r365UserRepository.findOne({
      where: { email },
      relations: ['role', 'countries', 'restaurants', 'areas'],
    });
  }

  async update(
    id: number,
    updateResto365UserDto: UpdateResto365UserDto,
    auditParams: AuditParams,
  ) {
    const user = await this.r365UserRepository.findOne({
      where: { id },
    });
    if (updateResto365UserDto.name) {
      user.name = updateResto365UserDto.name;
    }
    if (updateResto365UserDto.email) {
      user.email = updateResto365UserDto.email;
    }
    if (updateResto365UserDto.department) {
      user.department = updateResto365UserDto.department;
    }
    if (updateResto365UserDto.phone) {
      user.phone = updateResto365UserDto.phone;
    }
    if (updateResto365UserDto.roleId != null) {
      user.roleId = updateResto365UserDto.roleId;
    }
    if (updateResto365UserDto.countries) {
      user.countries = await this.r365CountryService.findByNames(
        updateResto365UserDto.countries,
      );
    }
    if (updateResto365UserDto.areaId != null) {
      user.areas = [
        await this.r365AreaService.findOne(updateResto365UserDto.areaId),
      ];
    }
    if (updateResto365UserDto.restaurantIds) {
      user.restaurants = await this.r365RestaurantService.findByIds(
        updateResto365UserDto.restaurantIds,
      );
    }
    return this.r365UserRepository.save({ ...user, ...auditParams });
  }

  remove(id: number) {
    return `This action removes a #${id} resto365User`;
  }
}
