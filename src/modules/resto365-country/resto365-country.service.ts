/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { UpdateResto365CountryDto } from './dto/update-resto365-country.dto';
import { CreateResto365CountryDto } from './dto/create-resto365-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resto365Country } from './entities/resto365-country.entity';

@Injectable()
export class Resto365CountryService {
  constructor(
    @InjectRepository(Resto365Country, 'r365')
    private r365CountryRepository: Repository<Resto365Country>,
  ) {}

  create(createResto365CountryDto: CreateResto365CountryDto) {
    return 'This action adds a new resto365Country';
  }

  findAll() {
    return this.r365CountryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} resto365Country`;
  }

  async findByNames(names: string[]) {
    const countries = await this.r365CountryRepository.find({
      where: {
        name: In([names]),
      },
    });
    return countries;
  }

  update(id: number, updateResto365CountryDto: UpdateResto365CountryDto) {
    return `This action updates a #${id} resto365Country`;
  }

  remove(id: number) {
    return `This action removes a #${id} resto365Country`;
  }
}
