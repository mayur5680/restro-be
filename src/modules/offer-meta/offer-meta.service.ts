import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferMetaDto } from './dto/create-offer-meta.dto';
import { UpdateOfferMetaDto } from './dto/update-offer-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferMeta } from './entities/offer-meta.entity';
import { Repository } from 'typeorm';
import { Offer } from '@modules/offer/entities/offer.entity';
import { OfferMetaSection } from '@modules/offer-meta/entities/offer-meta-section.entity';
import { GygQueryOptions } from '@modules/offer/types';
import { getFilteredWhere, getSortFieldAndDir } from '@modules/offer/utils';

@Injectable()
export class OfferMetaService {
  constructor(
    @InjectRepository(OfferMeta)
    private offerMetaRepository: Repository<OfferMeta>,
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(OfferMetaSection)
    private offerMetaSectionRepository: Repository<OfferMetaSection>,
  ) {}

  async create(createOfferMetaDto: CreateOfferMetaDto) {
    try {
      const offer = await this.offersRepository.findOne({
        where: { id: createOfferMetaDto.offerId },
      });
      if (!offer) {
        throw new BadRequestException(
          'Offer not found with id: ' + createOfferMetaDto.offerId,
        );
      }

      const { title, description, ...rest } = createOfferMetaDto;

      // Save Offer Meta
      const offerMetaDto = { ...rest };
      const createdOfferMeta = this.offerMetaRepository.create(offerMetaDto);
      await this.offerMetaRepository.save(createdOfferMeta);

      // Save Offer Meta Section
      const offerMetaSectionDto = {
        title,
        description,
        offerMetaId: createdOfferMeta.id,
      };
      const createdOfferMetaSection =
        this.offerMetaSectionRepository.create(offerMetaSectionDto);
      await this.offerMetaSectionRepository.save(createdOfferMetaSection);
      return this.findOne(createdOfferMeta.id);
    } catch (error) {
      // console.log(error);
    }
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    const where = getFilteredWhere(options);
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const queryOptions = {
      where,
      take,
      skip,
      order,
      relations: ['offerMetaSection'],
      select: {
        offerMetaSection: {
          title: true,
          description: true,
        },
      },
    };

    const [result, total] =
      await this.offerMetaRepository.findAndCount(queryOptions);

    return {
      data: result,
      meta: {
        totalRows: total,
        pages: Math.ceil(total / take),
      },
    };
  }

  findOne(id: string) {
    return this.offerMetaRepository.findOne({
      where: { id },
      relations: ['offerMetaSection'],
      select: {
        offerMetaSection: {
          title: true,
          description: true,
        },
      },
    });
  }

  findOneByOfferId(offerId: string) {
    return this.offerMetaRepository.findOne({
      where: { offerId },
      relations: ['offerMetaSection'],
      select: {
        offerMetaSection: {
          title: true,
          description: true,
        },
      },
    });
  }

  async update(id: string, updateOfferMetaDto: UpdateOfferMetaDto) {
    const offerMeta = await this.offerMetaRepository.findOne({ where: { id } });
    if (!offerMeta) {
      throw new BadRequestException('Offer Meta not found with id: ' + id);
    }
    const { title, description, ...rest } = updateOfferMetaDto;
    await this.offerMetaRepository.update({ id }, rest);

    if (title || description) {
      await this.offerMetaSectionRepository.update(
        { offerMetaId: id },
        { title, description },
      );
    }
  }

  async remove(id: string) {
    const offerMeta = await this.offerMetaRepository.findOne({ where: { id } });
    if (!offerMeta) {
      throw new BadRequestException('Offer Meta not found with id: ' + id);
    }
    await this.offerMetaSectionRepository.delete({ offerMetaId: id });
    await this.offerMetaRepository.delete({ id });
    return;
  }

  async removeByOfferId(offerId: string) {
    const offerMeta = await this.offerMetaRepository.findOne({
      where: { offerId },
    });
    if (!offerMeta) {
      throw new BadRequestException(
        'Offer Meta not found with offer id: ' + offerId,
      );
    }
    await this.offerMetaSectionRepository.delete({ offerMetaId: offerMeta.id });
    await this.offerMetaRepository.delete({ id: offerMeta.id });
    return;
  }

  async cloneByOffer(oldOfferId: string, newOfferId: string) {
    const offerMeta = await this.offerMetaRepository.findOne({
      where: { offerId: oldOfferId },
    });
    if (!offerMeta) {
      throw new BadRequestException(
        'Offer Meta not found with offer id: ' + oldOfferId,
      );
    }
    // Clone the Offer Meta
    const clonedOfferMetaData = { ...offerMeta };
    const { id, ...rest } = clonedOfferMetaData;
    const clonedOfferMeta = this.offerMetaRepository.create({
      ...rest,
      brazePromotionId: newOfferId.split('-')[0], // brazePromotionId is the first part of the newOfferId split by '-'
      offerId: newOfferId,
    });
    await this.offerMetaRepository.save(clonedOfferMeta);

    // Clone the Offer Meta Section
    const offerMetaSectionData = await this.offerMetaSectionRepository.findOne({
      where: { offerMetaId: id },
    });
    const clonedOfferMetaSectionData = { ...offerMetaSectionData };
    clonedOfferMetaSectionData.offerMetaId = clonedOfferMeta.id;
    const clonedOfferMetaSection = this.offerMetaSectionRepository.create(
      clonedOfferMetaSectionData,
    );
    await this.offerMetaSectionRepository.save(clonedOfferMetaSection);
    return this.findOne(clonedOfferMeta.id);
  }
}
