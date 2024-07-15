import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resto365Restaurant } from './entities/resto365-restaurant.entity';
import { CreateResto365RestaurantDto } from './dto/create-resto365-restaurant.dto';
import { compact, uniq } from 'lodash';
import { StoreService } from '@modules/store/store.service';
import { CreateStoreDto } from '@modules/store/dto/create-store.dto';
import { Store } from '@modules/store/entities/store.entity';
import { UpdateResto365RestaurantDto } from './dto/update-resto365-restaurant.dto';
import { UpdateStoreDto } from '@modules/store/dto/update-store.dto';
import { TagService } from '@modules/tag/tag.service';
import { StoreTagService } from '@modules/store-tag/store-tag.service';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { GroupStoreService } from '@modules/group-store/group-store.service';
import { CreateGroupStoreDto } from '@modules/group-store/dto/create-group-store.dto';
import { StoreChannelService } from '@modules/store-channel/store-channel.service';
import { CreateStoreChannelDto } from '@modules/store-channel/dto/create-store-channel.dto';
import { ChannelGroupStoreService } from '@modules/channel-group-store/channel-group-store.service';
import { CreateChannelGroupStoreDto } from '@modules/channel-group-store/dto/create-channel-group-store.dto';
import { StoreOrderOffsetService } from '@modules/store-order-offset/store-order-offset.service';
import { CreateStoreOrderOffsetDto } from '@modules/store-order-offset/dto/create-store-order-offset.dto';
import { MenuTemplateSectionOverrideService } from '@modules/menu-template-section-override/menu-template-section-override.service';
import { CreateMenuTemplateSectionOverrideDto } from '@modules/menu-template-section-override/dto/create-menu-template-section-override.dto';
import { SectionService } from '@modules/section/section.service';
import { MenuContainerOverrideService } from '@modules/menu-container-override/menu-container-override.service';
import { CreateMenuContainerOverrideDto } from '@modules/menu-container-override/dto/create-menu-container-override.dto';
import { MenuContainerService } from '@modules/menu-container/menu-container.service';
import { AuditParams } from 'src/shared/audit-logs.types';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';
import {
  tagIdsMapping,
  mappTagIds,
  mapPermanentOffsetAndValue,
  mapBreakfastSectionIds,
  mapHotDrinksSectionIds,
  icedCoffeePosPlus,
  mapDessertSectionIds,
  softServePosPlus,
  mapChurroPosPlus,
  mapChurroSandeaPosPlus,
  setGroupIdBasedOnPriceTier,
} from 'src/shared/gygMapping';

import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { UUID } from 'crypto';
import { generateMenu } from 'src/shared/service';
import { ConfigService } from '@modules/config/config.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { Statue } from 'src/shared/gygEnum';

import { ChannelGroupService } from '@modules/channel-group/channel-group.service';
import { ChannelGroupMenuTemplateService } from '@modules/channel-group-menu-template/channel-group-menu-template.service';
import { MenuTemplateService } from '@modules/menu-template/menu-template.service';

@Injectable()
export class Resto365RestaurantService {
  logger: GygLog;
  constructor(
    @InjectRepository(Resto365Restaurant, 'r365')
    private readonly restaurantRepository: Repository<Resto365Restaurant>,
    private readonly storeService: StoreService,
    private readonly tagService: TagService,
    private readonly storeTagService: StoreTagService,
    private readonly groupStoreService: GroupStoreService,
    private readonly storeChannelService: StoreChannelService,
    private readonly channelGroupStoreService: ChannelGroupStoreService,
    private readonly storeOrderOffsetService: StoreOrderOffsetService,
    private readonly menuTemplateSectionOverrideService: MenuTemplateSectionOverrideService,
    private readonly sectionService: SectionService,
    private readonly menuContainerOverrideService: MenuContainerOverrideService,
    private readonly menuContainerService: MenuContainerService,
    private readonly configService: ConfigService,
    private readonly resto365JobService: Resto365JobService,
    private readonly channelGroupService: ChannelGroupService,
    private readonly channelGroupMenuTemplateService: ChannelGroupMenuTemplateService,
    private readonly menuTemplateService: MenuTemplateService,
  ) {
    this.logger = new GygLog(Resto365RestaurantService.name);
  }

  async create(
    createRestaurantDto: CreateResto365RestaurantDto,
    user: Resto365User,
    auditParams: AuditParams,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365Restaurant> {
    try {
      // Check if restaurant already exists
      const restaurantExist = await this.checkIfRestaurantExists(
        createRestaurantDto.restaurantName,
      );
      if (restaurantExist) {
        throw new Error(
          `Restaurant with name ${createRestaurantDto.restaurantName} already exists`,
        );
      }

      // Create a Store record first
      const createdStore = await this.createStore(createRestaurantDto, user);

      // Use the generated Store ID as bhyveId for creating the Restaurant record
      const createdRestaurant = await this.createRestaurant(
        createRestaurantDto,
        user,
        createdStore,
      );

      this.logger.writeLog(
        'Create Restaurant',
        'Fetching all tags...',
        Loglevel.DEBUG,
      );
      const tags = await this.fetchAllTags();
      this.logger.writeLog(
        'Create Restaurant',
        'Tags fetched successfully',
        Loglevel.DEBUG,
      );

      // Map tag values with the corresponding attributes of createdRestaurant
      const tagIds = tagIdsMapping(createdRestaurant);

      // Filter active tag IDs
      const activeTagIds = Object.entries(tagIds)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value === 1)
        .map(([key]) => Number(key));

      // Filter active tags from fetched tags
      const activeTags = tags.data.filter((tag) =>
        activeTagIds.includes(tag.id),
      );

      this.logger.writeLog(
        'Create Restaurant',
        'Creating store tags...',
        Loglevel.DEBUG,
      );
      await Promise.all(
        activeTags.map(async (tag) => {
          await this.createStoreTags(
            createdStore.id,
            [tag.id.toString()],
            Boolean(tag.isActive),
            user,
            auditParams,
          );
        }),
      );
      this.logger.writeLog(
        'Create Restaurant',
        'Store tags created successfully',
        Loglevel.DEBUG,
      );

      // set menuTemplateId and posMenuId based on price tier
      const sectionIdsToDisable = [];
      const menuContainerPosPlusToDisable = [];

      // Set sectionIds to disable breackfast
      if (createRestaurantDto.breakfast === 0) {
        mapBreakfastSectionIds().forEach((sectionId) => {
          sectionIdsToDisable.push(sectionId);
        });
      }
      // Set sectionIds or menuContainerPosPlus to disable coffee
      if (createRestaurantDto.coffee === 0) {
        mapHotDrinksSectionIds().forEach((sectionId) => {
          sectionIdsToDisable.push(sectionId);
        });
      } else if (
        createRestaurantDto.coffee === 1 &&
        createRestaurantDto.icedCoffee === 0
      ) {
        icedCoffeePosPlus().forEach((posPlu) => {
          menuContainerPosPlusToDisable.push(posPlu);
        });
      }

      // Set sectionIds or menuContainerPosPlus to disable SoftServe and Churro
      if (
        createRestaurantDto.softServe === 0 &&
        createRestaurantDto.churro === 0
      ) {
        mapDessertSectionIds().forEach((sectionId) => {
          sectionIdsToDisable.push(sectionId);
        });
      } else if (
        createRestaurantDto.softServe === 0 &&
        createRestaurantDto.churro === 1
      ) {
        softServePosPlus().forEach((posPlu) => {
          menuContainerPosPlusToDisable.push(posPlu);
        });
      } else if (
        createRestaurantDto.softServe === 1 &&
        createRestaurantDto.churro === 0
      ) {
        mapChurroPosPlus().forEach((posPlu) => {
          menuContainerPosPlusToDisable.push(posPlu);
        });
      }
      // breakfast = 1 , breakFast MIAM = 20, Breakfast Menu HotDrinks = 13, Breakfast MIAM HotDrinks = 19, Deserts = 10

      createRestaurantDto.groupId = setGroupIdBasedOnPriceTier(
        createRestaurantDto.priceTier,
      );
      // Create group store record
      const createGroupStoreDto: CreateGroupStoreDto = {
        storeId: createdStore.id,
        groupId: createRestaurantDto.groupId,
        isActive: true,
        createdBy: user.id,
        updatedBy: user.id,
      };

      this.logger.writeLog(
        'Create Restaurant',
        'Creating group store...',
        Loglevel.DEBUG,
      );
      await this.createGroupStore(createGroupStoreDto);
      this.logger.writeLog(
        'Create Restaurant',
        'Group store created successfully',
        Loglevel.DEBUG,
      );

      // Create store channel records
      createRestaurantDto.channelIds.forEach(async (channelId) => {
        const createStoreChannelDto: CreateStoreChannelDto = {
          storeId: createdStore.id.toString(),
          channelId,
          isActive: 1,
          createdBy: user.id.toString(),
          updatedBy: user.id.toString(),
        };

        this.logger.writeLog(
          'Create Restaurant',
          'Creating store channel...',
          Loglevel.DEBUG,
        );
        await this.createStoreChannel(createStoreChannelDto);
        this.logger.writeLog(
          'Create Restaurant',
          'Store channel created successfully',
          Loglevel.DEBUG,
        );

        // Create channel group store records
        const createChannelGroupStoreDto: CreateChannelGroupStoreDto = {
          channelId,
          groupId: createRestaurantDto.groupId,
          storeId: createdStore.id,
          isActive: true,
          createdBy: user.id,
          updatedBy: user.id,
        };

        this.logger.writeLog(
          'Create Restaurant',
          'Creating channel group store...',
          Loglevel.DEBUG,
        );
        await this.createChannelGroupStore(createChannelGroupStoreDto);
        this.logger.writeLog(
          'Create Restaurant',
          'Channel group store created successfully',
          Loglevel.DEBUG,
        );

        const channelGroup =
          await this.channelGroupService.findAllByGroupIdAndChannelId(
            [createRestaurantDto.groupId],
            [channelId],
          );
        const channelGroupMenuTemplate =
          await this.channelGroupMenuTemplateService.findAllBychannelGroupId([
            channelGroup[0].id,
          ]);
        const menuTemplate = await this.menuTemplateService.findOne(
          channelGroupMenuTemplate[0].menuTemplateId,
        );

        // Insert menu template section override to disable breakfast
        await this.insertMenuTempSectionOverridToDisableSections(
          createRestaurantDto.groupId,
          channelId,
          createdStore.id,
          sectionIdsToDisable,
          menuTemplate.id,
          Statue.disable,
          user,
          user,
        );

        // Insert menu container overrides to disable menu containers
        await this.insertMenuContainerOverridesToDisableMenuContainers(
          createRestaurantDto.groupId,
          channelId,
          createdStore.id,
          menuTemplate.id,
          menuContainerPosPlusToDisable,
          menuTemplate.posMenuId,
          Statue.disable,
          user,
          user,
        );
      });

      // Insert store order offset
      this.logger.writeLog(
        'Create Restaurant',
        `Inserting store order offset... for store ID: ${createdStore.id}`,
        Loglevel.DEBUG,
      );
      await this.insertStoreOrderOffset(
        createdStore.id,
        user,
        correlationId,
        auditParams,
      );
      this.logger.writeLog(
        'Create Restaurant',
        'Store order offset inserted successfully',
        Loglevel.DEBUG,
      );

      return createdRestaurant;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create restaurant: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createStore(
    createRestaurantDto: CreateResto365RestaurantDto,
    user: Resto365User,
  ): Promise<Store> {
    const createStoreDto: CreateStoreDto = {
      posStoreId: createRestaurantDto.posStoreId,
      oldStoreId: createRestaurantDto.oldStoreId,
      name: createRestaurantDto.restaurantName,
      description: createRestaurantDto.description,
      timeZone: createRestaurantDto.timeZone,
      address1: createRestaurantDto.address1,
      address2: createRestaurantDto.address2,
      city: createRestaurantDto.city,
      postCode: createRestaurantDto.postCode,
      country: createRestaurantDto.country,
      state: createRestaurantDto.state,
      longitude: Number(createRestaurantDto.longitude),
      latitude: Number(createRestaurantDto.latitude),
      orderLink: createRestaurantDto.orderLink,
      cateringLink: createRestaurantDto.cateringLink,
      phone: createRestaurantDto.phoneNumber,
      email: createRestaurantDto.restaurantEmail,
      storeAlertEmail: createRestaurantDto.storeAlertEmail,
      displayOrder: createRestaurantDto.displayOrder,
      isActive: false,
      hasBreakfast: createRestaurantDto.breakfast === 1 ? true : false,
      hasCoffee: createRestaurantDto.coffee === 1 ? true : false,
      createdBy: user.id,
      updatedBy: user.id,
    };

    this.logger.writeLog(
      'Create Restaurant',
      `Creating store for restaurant: ${createRestaurantDto.restaurantName}`,
      Loglevel.DEBUG,
    );

    try {
      const createdStore = await this.storeService.create(createStoreDto);

      this.logger.writeLog(
        'Create Restaurant',
        `Store created successfully for restaurant: ${createRestaurantDto.restaurantName}`,
        Loglevel.DEBUG,
      );

      return createdStore;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create store: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createRestaurant(
    createRestaurantDto: CreateResto365RestaurantDto,
    user: Resto365User,
    createdStore: Store,
  ): Promise<Resto365Restaurant> {
    const restaurant = {
      ...createRestaurantDto,
      bhyveId: createdStore.id.toString(),
      createdAt: new Date(),
      createdBy: user.id,
      updatedAt: new Date(),
      updatedBy: user.id,
    };

    this.logger.writeLog(
      'Create Restaurant',
      `Creating restaurant: ${createRestaurantDto.restaurantName}`,
      Loglevel.DEBUG,
    );

    try {
      const createRestaurant: Resto365Restaurant =
        this.restaurantRepository.create(restaurant);

      const createdRestaurant =
        await this.restaurantRepository.save(createRestaurant);

      this.logger.writeLog(
        'Create Restaurant',
        `Restaurant created successfully: ${createRestaurantDto.restaurantName}`,
        Loglevel.DEBUG,
      );

      return createdRestaurant;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create restaurant: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  // private async setGroupIdMenuTemplateIdPosMenuId(priceTier: string) {
  //   const { groupId, menuTemplateId, posMenuId } =
  //     priceTier === 'T1'
  //       ? PRICE_TIER_CONSTANTS.T1
  //       : PRICE_TIER_CONSTANTS.DEFAULT;
  //   return { groupId, menuTemplateId, posMenuId };
  // }

  private async fetchAllTags() {
    try {
      const tags = await this.tagService.findAll({
        sortBy: 'id',
        take: 1000,
      });
      return tags;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to fetch tags: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createStoreTags(
    storeId: number,
    tags: string[],
    isActive: boolean,
    user: Resto365User,
    auditParams: AuditParams,
  ) {
    try {
      const storeTags = await Promise.all(
        tags.map(async (tag) => {
          const tagRecord = await this.tagService.findOne(Number(tag));
          if (tagRecord) {
            return this.storeTagService.create(
              {
                storeId,
                tagId: tagRecord.id,
                isActive,
                createdBy: user.id,
                updatedBy: user.id,
              },
              auditParams,
            );
          }
          return null;
        }),
      );

      return storeTags;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create store tags: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createGroupStore(createGroupStoreDto: CreateGroupStoreDto) {
    try {
      const groupStore =
        await this.groupStoreService.create(createGroupStoreDto);
      return groupStore;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create group store: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createStoreChannel(
    createStoreChannelDto: CreateStoreChannelDto,
  ) {
    try {
      this.logger.writeLog(
        'Create Restaurant',
        `Creating store channel with store ID: ${createStoreChannelDto.storeId} and channel ID: ${createStoreChannelDto.channelId}`,
        Loglevel.DEBUG,
      );
      const storeChannel = await this.storeChannelService.create(
        createStoreChannelDto,
      );
      if (!storeChannel) {
        this.logger.writeLog(
          'Create Restaurant',
          'Failed to create store channel',
          Loglevel.ERROR,
        );
        throw new Error('Failed to create store channel');
      }
      this.logger.writeLog(
        'Create Restaurant',
        `Store channel created successfully with store ID: ${createStoreChannelDto.storeId} and channel ID: ${createStoreChannelDto.channelId}`,
        Loglevel.DEBUG,
      );
      return storeChannel;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create store channel: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async createChannelGroupStore(
    createChannelGroupStoreDto: CreateChannelGroupStoreDto,
  ) {
    try {
      const channelGroupStore = await this.channelGroupStoreService.create(
        createChannelGroupStoreDto.channelId,
        createChannelGroupStoreDto.groupId,
        createChannelGroupStoreDto.storeId,
        createChannelGroupStoreDto.isActive,
        createChannelGroupStoreDto.createdBy,
        createChannelGroupStoreDto.updatedBy,
      );
      return channelGroupStore;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to create channel group store: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async insertStoreOrderOffset(
    storeId: number,
    user: Resto365User,
    corelationId: UUID,
    auditParams: AuditParams,
  ) {
    const valuesAndOffsets = mapPermanentOffsetAndValue();
    try {
      await Promise.all(
        valuesAndOffsets.map(async (item) => {
          const storeOrderOffsetDto: CreateStoreOrderOffsetDto = {
            storeId,
            value: item.value,
            offset: item.offset,
            isActive: true,
          };
          await this.storeOrderOffsetService.create(
            storeOrderOffsetDto,
            user,
            corelationId,
            auditParams,
          );
        }),
      );
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert store order offset: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async insertMenuTempSectionOverridToDisableSections(
    groupId: number,
    channelId: number,
    storeId: number,
    sectionIds: number[],
    menuTemplateId: number,
    status: string,
    createdBy: Resto365User,
    updatedBy: Resto365User,
  ) {
    try {
      sectionIds.forEach(async (sectionId) => {
        const sectionDetails = await this.getSectionDetails(sectionId);
        const menuTemplateSectionOverrideDto: CreateMenuTemplateSectionOverrideDto =
          {
            groupId,
            channelId,
            storeId,
            sectionId,
            name: sectionDetails.name,
            description: sectionDetails.description,
            status,
            displayOrder: sectionDetails.displayOrder,
            menuTemplateId,
            createdBy: createdBy.id,
            updatedBy: updatedBy.id,
          };

        this.logger.writeLog(
          'Create Restaurant',
          `Inserting menu template section override to disable sections with details ${JSON.stringify(menuTemplateSectionOverrideDto)}`,
          Loglevel.DEBUG,
        );
        const sectionOverrides =
          await this.menuTemplateSectionOverrideService.create(
            menuTemplateSectionOverrideDto,
          );
        if (!sectionOverrides) {
          this.logger.writeLog(
            'Create Restaurant',
            'Failed to insert menu template section override',
            Loglevel.ERROR,
          );
          throw new Error('Failed to insert menu template section override');
        }
        this.logger.writeLog(
          'Create Restaurant',
          'Menu template section override inserted successfully',
          Loglevel.DEBUG,
        );
      });
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu template section override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async getSectionDetails(sectionId: number) {
    const sectionDetails = this.sectionService.findOne(sectionId);
    return sectionDetails;
  }

  private async removeMenuTempSectionOverridesToEnableSections(
    groupId: number,
    channelId: number,
    storeId: number,
    sectionIds: number[],
    menuTemplateId: number,
    status: string,
  ) {
    try {
      const sectionOverrideIds = [];
      sectionIds.forEach(async (sectionId) => {
        const sectionOverridesToDelete = await this.getSectionOverridesToDelete(
          groupId,
          channelId,
          storeId,
          sectionId,
          menuTemplateId,
          status,
        );
        if (sectionOverridesToDelete) {
          sectionOverridesToDelete.map((sectionOverride) => {
            sectionOverrideIds.push(sectionOverride.id);
          });
        }

        this.logger.writeLog(
          'Create Restaurant',
          `Deleting menu template section overrides with IDs: ${sectionOverrideIds}`,
          Loglevel.DEBUG,
        );
        await this.menuTemplateSectionOverrideService.removeByIds(
          sectionOverrideIds,
        );
      });
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu template section override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async getSectionOverridesToDelete(
    groupId: number,
    channelId: number,
    storeId: number,
    sectionId: number,
    menuTemplateId: number,
    status: string,
  ) {
    try {
      const sectionOverridesToDelete =
        await this.menuTemplateSectionOverrideService.findAllToDelete(
          groupId,
          channelId,
          storeId,
          sectionId,
          menuTemplateId,
          status,
        );
      return sectionOverridesToDelete;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu template section override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async insertMenuContainerOverridesToDisableMenuContainers(
    groupId: number,
    channelId: number,
    storeId: number,
    menuTemplateId: number,
    menuContainerPosPlus: number[],
    posMenuId: number,
    status: string,
    createdBy: Resto365User,
    updatedBy: Resto365User,
  ) {
    try {
      menuContainerPosPlus.forEach(async (menuContainerPosPlu) => {
        const menuContainerDetails =
          await this.getMenuContainerDetails(menuContainerPosPlu);
        const menuContainerOverrideDto: CreateMenuContainerOverrideDto = {
          groupId,
          channelId,
          storeId,
          menuTemplateId,
          posMenuId,
          menuContainerPosPlu,
          name: menuContainerDetails.name,
          description: menuContainerDetails.description,
          status,
          createdBy: createdBy.id,
          updatedBy: updatedBy.id,
        };

        this.logger.writeLog(
          'Create Restaurant',
          `Inserting menu container override to disable menu containers with details ${JSON.stringify(menuContainerOverrideDto)}`,
          Loglevel.DEBUG,
        );
        const menuContainerOverrides =
          await this.menuContainerOverrideService.create(
            menuContainerOverrideDto,
          );
        if (!menuContainerOverrides) {
          this.logger.writeLog(
            'Create Restaurant',
            'Failed to insert menu container override',
            Loglevel.ERROR,
          );
          throw new Error('Failed to insert menu container override');
        }
        this.logger.writeLog(
          'Create Restaurant',
          'Menu container override inserted successfully',
          Loglevel.DEBUG,
        );
      });
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu container override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async getMenuContainerDetails(posPlu: number) {
    const menuContainerDetails = this.menuContainerService.findByPosPlu(posPlu);
    return menuContainerDetails;
  }

  private async removeMenuContainerOverridesToEnableMenuContainers(
    groupId: number,
    channelId: number,
    storeId: number,
    menuTemplateId: number,
    menuContainerPosPlus: number[],
    posMenuId: number,
    status: string,
  ) {
    try {
      const menuContainerOverrideIds = [];
      menuContainerPosPlus.forEach(async (menuContainerPosPlu) => {
        const menuContainerOverridesToDelete =
          await this.getMenuContainerOverrideDetailsToDelete(
            groupId,
            channelId,
            storeId,
            menuTemplateId,
            menuContainerPosPlu,
            posMenuId,
            status,
          );
        if (menuContainerOverridesToDelete) {
          menuContainerOverridesToDelete.map((menuContainerOverride) => {
            menuContainerOverrideIds.push(menuContainerOverride.id);
          });
        }
        this.logger.writeLog(
          'Create Restaurant',
          `Deleting menu container overrides with IDs: ${menuContainerOverrideIds}`,
          Loglevel.DEBUG,
        );
        await this.menuContainerOverrideService.removeByIds(
          menuContainerOverrideIds,
        );
      });
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu container override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async getMenuContainerOverrideDetailsToDelete(
    groupId: number,
    channelId: number,
    storeId: number,
    menuTemplateId: number,
    menuContainerPosPlu: number,
    posMenuId: number,
    status: string,
  ) {
    try {
      const menuContainerOverridesToDelete =
        await this.menuContainerOverrideService.findAllToDelete(
          groupId,
          channelId,
          storeId,
          menuTemplateId,
          menuContainerPosPlu,
          posMenuId,
          status,
        );
      this.logger.writeLog(
        'Create Restaurant',
        `Menu container overrides to delete: ${JSON.stringify(menuContainerOverridesToDelete)}`,
        Loglevel.DEBUG,
      );
      return menuContainerOverridesToDelete;
    } catch (error) {
      this.logger.writeLog(
        'Create Restaurant',
        `Failed to insert menu container override: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  private async checkIfRestaurantExists(restaurantName: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { restaurantName },
    });
    if (restaurant) {
      this.logger.writeLog(
        `Restaurant with name ${restaurantName} already exists`,
        null,
        Loglevel.ERROR,
      );
      return true;
    }
    return false;
  }

  async findAll(): Promise<Resto365Restaurant[]> {
    return await this.restaurantRepository.find({
      relations: [
        'resto365CerebroProductCompanyOverride.CerebroProductCompany',
      ],
    });
  }

  async findAllStates() {
    const restaurants = await this.restaurantRepository.find({
      select: ['state'],
    });

    let states = restaurants.map((item) => item.state.trim());
    states = uniq(compact(states));

    return states;
  }

  async findAllpriceTiers() {
    const restaurants = await this.restaurantRepository.find({
      select: ['priceTier'],
    });

    let priceTiers = restaurants.map((item) => item.priceTier.trim());
    priceTiers = uniq(compact(priceTiers));

    return priceTiers;
  }

  async findOne(id: number): Promise<Resto365Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: [
        'resto365CerebroProductCompanyOverride.CerebroProductCompany',
      ],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async findByIds(ids: number[]): Promise<Resto365Restaurant[]> {
    const restaurants = await this.restaurantRepository.find({
      where: { id: In(ids) },
      relations: [
        'resto365CerebroProductCompanyOverride.CerebroProductCompany',
      ],
    });

    return restaurants;
  }

  async findOneByBhyveId(bhyveId: string): Promise<Resto365Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { bhyveId },
      relations: [
        'resto365CerebroProductCompanyOverride.CerebroProductCompany',
      ],
    });
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with Bhyve ID ${bhyveId} not found`,
      );
    }
    return restaurant;
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateResto365RestaurantDto,
    user: Resto365User,
    auditParams: AuditParams,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365Restaurant> {
    try {
      let menuGenerationNeeded = false;
      // Find the existing restaurant record
      const existingRestaurant = await this.findOne(id);
      const channelGroupStores =
        await this.channelGroupStoreService.findAllByStoreId(
          Number(existingRestaurant.bhyveId),
        );

      // Create a partial update DTO
      const updateStoreDto: Partial<UpdateStoreDto> = {
        name: updateRestaurantDto.restaurantName,
        phone: updateRestaurantDto.phoneNumber,
        email: updateRestaurantDto.restaurantEmail,
        hasBreakfast: updateRestaurantDto.breakfast === 1 ? true : false,
        hasCoffee: updateRestaurantDto.coffee === 1 ? true : false,
      };

      Object.entries(updateRestaurantDto).map(([key, value]) => {
        // Update Store record first
        if (value !== undefined) {
          updateStoreDto[key] = value;
          if (typeof value === 'boolean') {
            updateStoreDto[key] = value ? 1 : 0;
          } else if (typeof value === 'string') {
            updateStoreDto[key] = value.trim();
          } else if (typeof value === 'number') {
            updateStoreDto[key] = value;
          } else if (typeof value === 'object') {
            updateStoreDto[key] = value;
          } else {
            updateStoreDto[key] = value;
          }
        }
      });
      try {
        // set menuTemplateId and posMenuId based on price tier
        const sectionIdsToDisable = [];
        const menuContainerPosPlusToDisable = [];
        const sectionIdsToEnable = [];
        const menuContainerPosPlusToEnable = [];
        // Update the associated Store record
        this.logger.writeLog(
          'Update Restaurant',
          `Updating store with ID ${existingRestaurant.bhyveId} and payload ${JSON.stringify(updateStoreDto)}`,
          correlationId,
          Loglevel.DEBUG,
        );
        await this.storeService.update(
          Number(existingRestaurant.bhyveId),
          updateStoreDto,
          auditParams,
        );
        this.logger.writeLog(
          'Update Restaurant',
          `Store with ID ${existingRestaurant.bhyveId} updated successfully`,
          Loglevel.DEBUG,
        );

        // Update the Restaurant record
        this.logger.writeLog(
          'Update Restaurant',
          `Updating restaurant with ID ${id} with payload ${JSON.stringify(updateRestaurantDto)}`,
          Loglevel.DEBUG,
        );
        const updatedRestaurant: Resto365Restaurant = {
          ...auditParams,
          ...existingRestaurant,
          ...updateRestaurantDto,
          updatedAt: new Date(),
          updatedBy: user.id,
        };

        // Save the updated restaurant record
        let updatedRestaurantResult =
          await this.restaurantRepository.save(updatedRestaurant);
        this.logger.writeLog(
          'Update Restaurant',
          `Restaurant with ID ${id} updated successfully`,
          Loglevel.DEBUG,
        );

        // Get the tag IDs for specific attributes from update RestaurantDto
        const tagIdMapping = mappTagIds();

        // Update store tags for updated Restaurant
        this.logger.writeLog(
          'Update Restaurant',
          `Updating store tags... with payload ${JSON.stringify(tagIdMapping)}`,
          Loglevel.DEBUG,
        );
        await Promise.all(
          Object.entries(tagIdMapping).map(async ([tagId, attribute]) => {
            if (updateRestaurantDto[attribute] !== undefined) {
              const isActive =
                updateRestaurantDto[attribute] === 1 ? true : false;
              await this.updateOrCreateStoreTag(
                Number(existingRestaurant.bhyveId),
                Number(tagId),
                isActive,
                auditParams,
              );
            }
          }),
        );

        this.logger.writeLog(
          'Update Restaurant',
          'Store tags updated successfully',
          Loglevel.DEBUG,
        );

        // Set sectionIds to disable/enable breackfast
        if (
          existingRestaurant.breakfast !== updateRestaurantDto.breakfast &&
          updateRestaurantDto.breakfast != null &&
          updateRestaurantDto.breakfast !== undefined
        ) {
          const sectionIdMapFunction = (sectionId: number) => {
            if (updateRestaurantDto.breakfast === 0) {
              sectionIdsToDisable.push(sectionId);
            } else {
              sectionIdsToEnable.push(sectionId);
            }
          };

          mapBreakfastSectionIds().forEach(sectionIdMapFunction);
        }

        // Set sectionIds to disable/enable coffee
        if (
          existingRestaurant.coffee !== updateRestaurantDto.coffee &&
          updateRestaurantDto.coffee != null &&
          updateRestaurantDto.coffee !== undefined
        ) {
          const sectionIdMapFunction = (sectionId: number) => {
            if (updateRestaurantDto.coffee === 0) {
              sectionIdsToDisable.push(sectionId);
            } else {
              sectionIdsToEnable.push(sectionId);
              if (existingRestaurant.icedCoffee === 1) {
                const posPluMapFunction = (posPlu: number) => {
                  menuContainerPosPlusToEnable.push(posPlu);
                };
                icedCoffeePosPlus().forEach(posPluMapFunction);
              }
            }
          };
          mapHotDrinksSectionIds().forEach(sectionIdMapFunction);
        }

        if (
          // Set menuContainerPosPlus to disable/enable iced-doffee
          existingRestaurant.icedCoffee !== updateRestaurantDto.icedCoffee &&
          updateRestaurantDto.icedCoffee != null &&
          updateRestaurantDto.icedCoffee !== undefined
        ) {
          const posPluMapFunction = (posPlu: number) => {
            if (updateRestaurantDto.icedCoffee === 0) {
              menuContainerPosPlusToDisable.push(posPlu);
            } else {
              menuContainerPosPlusToEnable.push(posPlu);
            }
          };
          icedCoffeePosPlus().forEach(posPluMapFunction);
        }

        // Set sectionIds or menuContainerPosPlus to disable SoftServe, Churro, and Churro-Sundae
        if (
          (existingRestaurant.softServe !== updateRestaurantDto.softServe &&
            updateRestaurantDto.softServe !== null &&
            updateRestaurantDto.softServe !== undefined) ||
          (existingRestaurant.churro !== updateRestaurantDto.churro &&
            updateRestaurantDto.churro !== null &&
            updateRestaurantDto.churro !== undefined)
        ) {
          const sectionIdMapFunction = (sectionId: number) => {
            const SoftServeNewValue = updateRestaurantDto.softServe;
            const churroNewValue = updateRestaurantDto.churro;
            const softserveOldValue = existingRestaurant.softServe;
            const churroOldValue = existingRestaurant.churro;

            const shouldDisableSection =
              (SoftServeNewValue === 0 && churroNewValue === 0) ||
              (SoftServeNewValue === 0 &&
                churroOldValue === 0 &&
                !churroNewValue) ||
              (churroNewValue === 0 &&
                softserveOldValue === 0 &&
                !SoftServeNewValue);

            this.logger.writeLog(
              'Update Restaurant',
              `shouldDisableSection: ${shouldDisableSection} SoftServeNewValue: ${SoftServeNewValue}, churroNewValue: ${churroNewValue}, softserveOldValue: ${softserveOldValue}, churroOldValue: ${churroOldValue}`,
              Loglevel.ERROR,
            );

            if (shouldDisableSection) {
              sectionIdsToDisable.push(sectionId);
            } else {
              sectionIdsToEnable.push(sectionId);

              if (
                (SoftServeNewValue === 1 && churroNewValue === 1) ||
                (SoftServeNewValue === 1 &&
                  churroOldValue === 1 &&
                  (churroNewValue === undefined || churroNewValue === null)) ||
                (churroNewValue === 1 &&
                  softserveOldValue === 1 &&
                  (SoftServeNewValue === undefined ||
                    SoftServeNewValue === null))
              ) {
                softServePosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroSandeaPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
              } else if (
                (SoftServeNewValue === 1 && churroNewValue === 0) ||
                (SoftServeNewValue === 1 &&
                  churroOldValue === 0 &&
                  (churroNewValue === undefined || churroNewValue === null))
              ) {
                softServePosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
                mapChurroSandeaPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
              } else if (
                (SoftServeNewValue === 0 && churroNewValue === 1) ||
                (SoftServeNewValue === 0 &&
                  churroOldValue === 1 &&
                  (churroNewValue === undefined || churroNewValue === null))
              ) {
                softServePosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
                mapChurroPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroSandeaPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
              } else if (
                (churroNewValue === 1 && SoftServeNewValue === 0) ||
                (churroNewValue === 1 &&
                  softserveOldValue === 0 &&
                  (SoftServeNewValue === undefined ||
                    SoftServeNewValue === null))
              ) {
                softServePosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
                mapChurroPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroSandeaPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
              } else if (
                (churroNewValue === 0 && SoftServeNewValue === 1) ||
                (churroNewValue === 0 &&
                  softserveOldValue === 1 &&
                  (SoftServeNewValue === undefined ||
                    SoftServeNewValue === null))
              ) {
                softServePosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToEnable.push(posPlu),
                );
                mapChurroPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
                mapChurroSandeaPosPlus().forEach((posPlu) =>
                  menuContainerPosPlusToDisable.push(posPlu),
                );
              }
            }
          };

          mapDessertSectionIds().forEach(sectionIdMapFunction);
        }

        // breakfast = 1 , breakFast MIAM = 20, Breakfast Menu HotDrinks = 13, Breakfast MIAM HotDrinks = 19, Deserts = 10

        this.logger.writeLog(
          'Log sectionIdsToDisable and sectionIdsToEnable and menuContainerPosPlusToDisable and menuContainerPosPlusToEnable',
          `sectionIdsToDisable: ${sectionIdsToDisable}, sectionIdsToEnable: ${sectionIdsToEnable}, menuContainerPosPlusToDisable: ${menuContainerPosPlusToDisable}, menuContainerPosPlusToEnable: ${menuContainerPosPlusToEnable}`,
          Loglevel.DEBUG,
        );
        channelGroupStores.forEach(async (channelGroupStore) => {
          const channelGroup =
            await this.channelGroupService.findAllByGroupIdAndChannelId(
              [channelGroupStore.groupId],
              [channelGroupStore.channelId],
            );
          const channelGroupMenuTemplate =
            await this.channelGroupMenuTemplateService.findAllBychannelGroupId([
              channelGroup[0].id,
            ]);
          const menuTemplate = await this.menuTemplateService.findOne(
            channelGroupMenuTemplate[0].menuTemplateId,
          );

          this.logger.writeLog(
            'Result of groupId, channelId, menuTemplateId and posMenuId',
            `groupId: ${channelGroupStore.groupId}, channelId: ${channelGroupStore.channelId}, menuTemplateId: ${menuTemplate.id}, posMenuId: ${menuTemplate.posMenuId}`,
            Loglevel.DEBUG,
          );

          if (sectionIdsToDisable.length > 0) {
            menuGenerationNeeded = true;
            // Disable Sections by insertMenuTempSectionOverridToDisableSections
            this.insertMenuTempSectionOverridToDisableSections(
              channelGroupStore.groupId,
              channelGroupStore.channelId,
              Number(existingRestaurant.bhyveId),
              sectionIdsToDisable,
              menuTemplate.id,
              Statue.disable,
              user,
              user,
            );
          }
          if (sectionIdsToEnable.length > 0) {
            menuGenerationNeeded = true;
            // Enable Sections by removeMenuTempSectionOverridesToEnableSections
            this.removeMenuTempSectionOverridesToEnableSections(
              channelGroupStore.groupId,
              channelGroupStore.channelId,
              Number(existingRestaurant.bhyveId),
              sectionIdsToEnable,
              menuTemplate.id,
              Statue.disable,
            );
          }
          if (menuContainerPosPlusToDisable.length > 0) {
            menuGenerationNeeded = true;
            // Disable Menu Containers by insertMenuContainerOverridesToDisableMenuContainers
            this.insertMenuContainerOverridesToDisableMenuContainers(
              channelGroupStore.groupId,
              channelGroupStore.channelId,
              Number(existingRestaurant.bhyveId),
              menuTemplate.id,
              menuContainerPosPlusToDisable,
              menuTemplate.posMenuId,
              Statue.disable,
              user,
              user,
            );
          }
          if (menuContainerPosPlusToEnable.length > 0) {
            menuGenerationNeeded = true;
            // Enable Menu Containers by removeMenuContainerOverridesToEnableMenuContainers
            this.removeMenuContainerOverridesToEnableMenuContainers(
              channelGroupStore.groupId,
              channelGroupStore.channelId,
              Number(existingRestaurant.bhyveId),
              menuTemplate.id,
              menuContainerPosPlusToEnable,
              menuTemplate.posMenuId,
              Statue.disable,
            );
          }
        });

        if (existingRestaurant.isActive !== updatedRestaurantResult.isActive) {
          menuGenerationNeeded = true;
          this.logger.writeLog(
            'Update Restaurant',
            `Restaurant with ID ${id} is being ${
              updatedRestaurantResult.isActive ? 'activated' : 'deactivated'
            }`,
            Loglevel.DEBUG,
          );
        }

        // check if the menu needs to be generated - menuGeneration
        if (menuGenerationNeeded) {
          this.logger.writeLog(
            'Update Restaurant',
            `Menu generation for store with ID ${existingRestaurant.bhyveId} Started... with channelGroupStores: ${JSON.stringify(channelGroupStores)}`,
            Loglevel.DEBUG,
          );

          updatedRestaurantResult = await this.updateNeedMenuGenerateFlag(
            updatedRestaurantResult.id,
            Number(true),
            correlationId,
          );

          //* generate menu
          await generateMenu(
            channelGroupStores,
            updatedRestaurantResult,
            this.configService.bhyveConfig.bhvyeHttp,
            this.logger,
            this.resto365JobService,
            this,
            user,
            correlationId,
          );
        }

        return updatedRestaurantResult;
      } catch (error) {
        this.logger.writeLog(
          'Update Restaurant',
          `Failed to update store: ${error.message}`,
          Loglevel.ERROR,
        );

        if (error instanceof Error) {
          this.handleStoreUpdateFailure(error);
          throw new Error('Failed to update restaurant and store');
        }
      }
    } catch (error) {
      this.logger.writeLog(
        'Update Restaurant',
        `Failed to update restaurant: ${error.message}`,
        Loglevel.ERROR,
      );

      if (error instanceof Error) {
        throw new Error('Failed to update restaurant');
      }
    }
  }

  handleStoreUpdateFailure(error: Error) {
    this.logger.writeLog(
      'Update Restaurant',
      `Failed to update store: ${error.message}`,
      Loglevel.ERROR,
    );
  }

  private async updateOrCreateStoreTag(
    storeId: number,
    tagId: number,
    isActive: boolean,
    auditParams: AuditParams,
  ) {
    try {
      this.logger.writeLog(
        'Update Restaurant',
        'Updating or creating store tag...',
        Loglevel.DEBUG,
      );

      // Check if the tag exists
      const tag = await this.tagService.findOne(tagId);
      if (!tag) {
        throw new Error(`Tag with ID ${tagId} not found`);
      }

      // Perform upsert operation
      const storeTag = await this.storeTagService.upsert(
        {
          storeId: storeId,
          tagId: tag.id,
          isActive: isActive,
        },
        auditParams,
      );

      this.logger.writeLog(
        'Update Restaurant',
        'Store tag updated or created successfully',
        Loglevel.DEBUG,
      );
      return storeTag;
    } catch (error) {
      this.logger.writeLog(
        'Update Restaurant',
        `Failed to update or create store tag: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  async findRestaurant(id: number): Promise<Resto365Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} is not found`);
    }
    return restaurant;
  }

  async syncWithBhyve(
    bhyveId: string,
    updateRestaurantDto: UpdateResto365RestaurantDto,
  ): Promise<Resto365Restaurant> {
    try {
      const existingRestaurant = await this.findOneByBhyveIdForSync(bhyveId);

      // Update Restaurant record from TempRestaurant record
      const updatedRestaurant: Resto365Restaurant = {
        ...existingRestaurant,
        ...updateRestaurantDto,
        createdBy: 2,
        updatedBy: 2,
      };

      // Save the updated restaurant record
      const updatedRestaurantResult =
        await this.restaurantRepository.save(updatedRestaurant);
      this.logger.writeLog(
        'Sync Restaurant',
        `Restaurant with Bhyve ID ${bhyveId} updated successfully via sync from TempRestaurant record`,
        Loglevel.DEBUG,
      );

      return updatedRestaurantResult;
    } catch (error) {
      this.logger.writeLog(
        'Sync Restaurant',
        `Failed to sync restaurant: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }

  async findOneByBhyveIdForSync(bhyveId: string): Promise<Resto365Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { bhyveId },
    });
    if (!restaurant) {
      this.logger.writeLog(
        'Sync Restaurant',
        `Restaurant with Bhyve ID ${bhyveId} not found`,
        Loglevel.ERROR,
      );
    }
    return restaurant;
  }

  async updateNeedMenuGenerateFlag(
    id: number,
    needMenuGenerate: number,
    @CorrelationId() correlationId: UUID,
  ): Promise<Resto365Restaurant> {
    try {
      const existingRestaurant = await this.findOne(id);

      // Update the needMenuGenerate flag
      existingRestaurant.needMenuGenerate = needMenuGenerate;

      // Save the updated restaurant record
      const updatedRestaurantResult =
        await this.restaurantRepository.save(existingRestaurant);
      this.logger.writeLog(
        'Update Restaurant',
        `NeedMenuGenerate flag updated successfully for restaurant with ID ${id}`,
        correlationId,
        Loglevel.DEBUG,
      );

      return updatedRestaurantResult;
    } catch (error) {
      this.logger.writeLog(
        'Update Restaurant',
        `Failed to update needMenuGenerate flag: ${error.message}`,
        Loglevel.ERROR,
      );
      throw error;
    }
  }
}
