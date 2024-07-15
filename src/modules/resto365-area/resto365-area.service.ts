/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, Query } from '@nestjs/common';
import { CreateResto365AreaDto } from './dto/create-resto365-area.dto';
import { UpdateResto365AreaDto } from './dto/update-resto365-area.dto';
import { Resto365Area } from './entities/resto365-area.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryCode } from '@modules/resto365-country/types';
import { isArray } from 'lodash';

@Injectable()
export class Resto365AreaService {
  constructor(
    @InjectRepository(Resto365Area, 'r365')
    private resto365AreaRepository: Repository<Resto365Area>,
  ) {}
  create(createResto365AreaDto: CreateResto365AreaDto) {
    return 'This action adds a new resto365Area';
  }

  findAll() {
    return this.resto365AreaRepository.find({
      relations: ['country'],
      select: {
        country: {
          name: true,
        },
      },
    });
  }

  findByCountries(countries: CountryCode | CountryCode[]) {
    return this.resto365AreaRepository.find({
      relations: ['country'],
      where: {
        country: {
          name: In(Array.isArray(countries) ? countries : [countries]),
        },
      },
      select: {
        country: {
          name: true,
        },
      },
    });
  }

  findByIds(ids: number[]) {
    return this.resto365AreaRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  findOne(id: number, include: string[] = []) {
    return this.resto365AreaRepository.findOne({
      where: { id },
      relations: include.includes('restaurants') ? ['restaurants'] : [],
      select: {
        restaurants: {
          id: true,
          restaurantName: true,
          areaId: true,
        },
        country: {
          name: true,
        },
      },
    });
  }

  update(id: number, updateResto365AreaDto: UpdateResto365AreaDto) {
    return `This action updates a #${id} resto365Area`;
  }

  remove(id: number) {
    return `This action removes a #${id} resto365Area`;
  }
}
