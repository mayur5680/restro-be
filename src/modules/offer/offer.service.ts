import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { In, Repository } from 'typeorm';
import { arrayDiff, getFilteredWhere, getSortFieldAndDir } from './utils';
import { GygQueryOptions } from './types';
import { Reward } from '../reward/entities/reward.entity';
import { Merchandise } from '../merchandise/entities/merchandise.entity';
import { Product } from '@modules/product/entities/product.entity';
import { StoreOffer } from '@modules/store-offer/entities/store-offer.entity';
import { OfferAttributes } from '@modules/offer-attribute/entities/offer-attributes.entity';
import { Store } from '@modules/store/entities/store.entity';
import { OfferMetaService } from '@modules/offer-meta/offer-meta.service';
import { CloneOfferDto } from './dto/clone-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(OfferAttributes)
    private offerAttributesRepository: Repository<OfferAttributes>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(StoreOffer)
    private storeOfferRepository: Repository<StoreOffer>,
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
    @InjectRepository(Merchandise)
    private merchandiseRepository: Repository<Merchandise>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @Inject(OfferMetaService)
    private offerMetaService: OfferMetaService,
  ) {}

  public async create(createOfferDto: CreateOfferDto) {
    //Todo: Validate OfferBrackets with rewards and triggers

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { offerAttributes, offerStores, ...rest } = createOfferDto;

      // Validate Stores
      const stores = await this.storesRepository.find({
        where: { id: In(offerStores) },
        select: ['id', 'name'],
      });

      // If database query returned lesser rows than the sent ids array, then exceptionWrapper(error);
      if (stores.length < offerStores.length) {
        const dbStoreIds = stores.map((s) => s.id);
        const invalidStoreIds = arrayDiff(dbStoreIds, offerStores);
        throw new BadRequestException(
          `Cannot find stores with Ids: ${invalidStoreIds.join(', ')}`,
        );
      }
      // End Validations

      // Insert into Offer Table
      const createdOffer = this.offersRepository.create({
        ...rest,
        status: 'INACTIVE',
      });
      const offer = await this.offersRepository.save(createdOffer);

      // Add related data
      await this.addRelated(offer.id, createOfferDto);

      return this.findOne(offer.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(options?: GygQueryOptions) {
    const { take = 10, skip = 0 } = options;

    // Do the filtering from ?filters[name]=abc&filters[age]=21
    const where = getFilteredWhere(options);

    // Do the sorting
    const order = getSortFieldAndDir(options, {
      createdAt: 'DESC',
    });

    const [result, total] = await this.offersRepository.findAndCount({
      where,
      take,
      skip,
      order,
      relations: {
        offerAttributes: true,
        stores: true,
        offerMeta: {
          offerMetaSection: true,
        },
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
    const offer = await this.offersRepository.findOne({
      where: { id },
      select: {
        stores: {
          id: true,
          name: true,
        },
      },
      relations: {
        offerAttributes: true,
        stores: true,
        offerMeta: {
          offerMetaSection: true,
        },
      },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found.`);
    }

    const upOffer = await this.getRewardWithOffer(offer);

    return upOffer;
  }

  /**
   * Function to fetch the related Reward of the offer
   * @param offer
   */
  async getRewardWithOffer(offer: Offer) {
    // If there is a foreign key `rewardId` in the offerBracket, then fetch it from rewards table

    if (offer?.offerAttributes?.offerDetails?.offerBrackets?.[0]?.rewardId) {
      const firstOfferBracket =
        offer.offerAttributes.offerDetails.offerBrackets[0];
      const reward = await this.getRewardById(firstOfferBracket.rewardId);
      firstOfferBracket.reward = reward;

      if (reward.properties?.[0]) {
        if (reward.properties[0].merchandiseId) {
          const firstRewardProperty = reward.properties[0];
          const merchandise = await this.getMerchandiseById(
            firstRewardProperty.merchandiseId,
          );
          reward.properties[0].merchandise = merchandise;
        } else if (reward.properties[0].productId) {
          const properties = [];
          for (const property of reward.properties) {
            const product = await this.productRepository.findOne({
              where: { id: property.productId },
            });
            property.product = product;
            properties.push(property);
          }
          reward.properties = properties;
        }
      }
    } else {
      // Else if the rewards property is already mentioned in the offerbrackets, fetch it from there
      // const upOffer = await this.getInlineRewards(offer);
    }
    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    const offer = await this.offersRepository.findOne({ where: { id } });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { offerAttributes, offerStores, ...rest } = updateOfferDto;

    await this.offersRepository.update({ id }, rest);

    if (offerAttributes && offerStores) {
      // Remove data from related tables
      await this.removeRelatedRowsByOfferId(id);

      // Add related data
      await this.addRelated(id, updateOfferDto);
    }

    return this.findOne(id);
  }

  async addRelated(id: string, dto: CreateOfferDto | UpdateOfferDto) {
    const { offerAttributes, offerStores } = dto;
    const { offerBrackets } = offerAttributes.offerDetails;
    const firstOfferBracket = offerBrackets[0];
    const { rewards } = firstOfferBracket;
    const { discountType, type } = rewards[0];

    // Insert into Rewards Table
    const rewardData: Partial<Reward> = {
      name: dto.name,
      properties: rewards,
      type,
      discountType,
    };

    const createdReward = this.rewardsRepository.create(rewardData);
    await this.rewardsRepository.save(createdReward);

    delete offerAttributes.offerDetails.offerBrackets[0].rewards;
    offerAttributes.offerDetails.offerBrackets[0].rewardId = createdReward.id;

    // Insert into OfferAttributes Table
    const offerAttributesData = {
      ...offerAttributes,
      offerId: id,
    };

    const createdOfferAttribute =
      this.offerAttributesRepository.create(offerAttributesData);
    await this.offerAttributesRepository.save(createdOfferAttribute);

    // Insert into StoreOffer Table
    const offerStoreData = offerStores.map((storeId: number) => ({
      offerId: id,
      storeId: storeId,
    }));
    await this.storeOfferRepository.insert(offerStoreData);
  }

  async remove(id: string) {
    const offer = await this.offersRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new BadRequestException(`Offer with id: ${id} not found`);
    }

    try {
      await this.storeOfferRepository.delete({ offerId: id });
      const rewardId =
        offer.offerAttributes.offerDetails.offerBrackets[0].rewardId;
      await this.rewardsRepository.delete({ id: rewardId });
      await this.offerAttributesRepository.delete({ offerId: id });
      await this.offerMetaService.removeByOfferId(id);
      await this.offersRepository.delete({ id });
      return;
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not delete offer. ${error}`,
      );
    }
  }

  async removeRelated(id: string) {
    const offer = await this.findOne(id);

    if (!offer) {
      throw new BadRequestException(`Offer with id: ${id} not found`);
    }

    try {
      await this.storeOfferRepository.delete({ offerId: id });
      const rewardId =
        offer.offerAttributes.offerDetails.offerBrackets[0].rewardId;
      await this.rewardsRepository.delete({ id: rewardId });
      await this.offerAttributesRepository.delete({ offerId: id });
      return;
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not delete offer's relations. ${error}`,
      );
    }
  }

  async removeRelatedRowsByOfferId(id: string) {
    const offer = await this.offersRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new BadRequestException(`Offer with id: ${id} not found`);
    }

    try {
      await this.storeOfferRepository.delete({ offerId: id });
      await this.offerAttributesRepository.delete({ offerId: id });
      return;
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not delete offer. ${error}`,
      );
    }
  }

  async clone(cloneOfferDto: CloneOfferDto) {
    const { id, name, startDate, endDate } = cloneOfferDto;
    const offer = await this.offersRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new BadRequestException(`Offer with id: ${id} not found`);
    }

    try {
      // Clone the Offer
      const data = {
        ...offer,
        startDate,
        endDate,
        name,
        createdAt: new Date(),
        updatedAt: null,
      };
      delete data.id;

      const clonedOffer = this.offersRepository.create(data);
      await this.offersRepository.save(clonedOffer);

      const offerAttributes = await this.offerAttributesRepository.findOne({
        where: { offerId: id },
      });

      // Clone the Reward
      const reward = await this.getRewardById(
        offerAttributes.offerDetails.offerBrackets[0].rewardId,
      );
      const clonedRewardData = { ...reward };
      delete clonedRewardData.id;
      const clonedReward = this.rewardsRepository.create(clonedRewardData);
      await this.rewardsRepository.save(clonedReward);

      // Clone the Offer Attributes
      const clonedOfferAttributesData = { ...offerAttributes };
      delete clonedOfferAttributesData.id;
      clonedOfferAttributesData.offerId = clonedOffer.id;
      clonedOfferAttributesData.offerDetails.offerBrackets[0].rewardId =
        clonedReward.id;
      await this.offerAttributesRepository.save(clonedOfferAttributesData);

      // Clone the Offer Meta
      if (cloneOfferDto.shouldCloneOfferMeta) {
        const offerMeta = await this.offerMetaService.findOneByOfferId(id);
        if (offerMeta) {
          await this.offerMetaService.cloneByOffer(id, clonedOffer.id);
        }
      }

      // Clone the Stores
      if (cloneOfferDto.shouldCloneStores) {
        const storeOffers = await this.storeOfferRepository.findBy({
          offerId: id,
        });
        if (storeOffers?.length) {
          const clonedStoreOffers = storeOffers.map((storeOffer) => {
            const clonedStoreOffer = { ...storeOffer };
            delete clonedStoreOffer.id;
            clonedStoreOffer.offerId = clonedOffer.id;
            return clonedStoreOffer;
          });
          await this.storeOfferRepository.insert(clonedStoreOffers);
        }
      }

      return this.findOne(clonedOffer.id);
    } catch (error) {
      throw new InternalServerErrorException(`Could not clone offer. ${error}`);
    }
  }

  async getRewardById(rewardId: number) {
    return this.rewardsRepository.findOne({ where: { id: rewardId } });
  }

  async getMerchandiseById(merchandiseId: number) {
    return this.merchandiseRepository.findOne({ where: { id: merchandiseId } });
  }
}
