import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferAttributeDto } from './dto/create-offer-attribute.dto';
import { UpdateOfferAttributeDto } from './dto/update-offer-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferAttributes } from './entities/offer-attributes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfferAttributeService {
  constructor(
    @InjectRepository(OfferAttributes)
    private offerAttributesRepository: Repository<OfferAttributes>,
  ) {}
  create(createOfferAttributeDto: CreateOfferAttributeDto) {
    const createdOfferAttribute = this.offerAttributesRepository.create(
      createOfferAttributeDto,
    );
    return this.offerAttributesRepository.save(createdOfferAttribute);
  }

  findAll() {
    return `This action returns all offerAttribute`;
  }

  findOne(id: string) {
    return `This action returns a #${id} offerAttribute`;
  }

  async update(id: string, updateOfferAttributeDto: UpdateOfferAttributeDto) {
    const result = await this.offerAttributesRepository.update(
      { id },
      updateOfferAttributeDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} offerAttribute`;
  }
}
