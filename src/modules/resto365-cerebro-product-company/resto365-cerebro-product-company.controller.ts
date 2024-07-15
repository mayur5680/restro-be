/* eslint-disable no-console */
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  Body,
  Put,
  UseInterceptors,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { chunk, compact, flatten, isEmpty, sortBy, uniqBy } from 'lodash';
import { Resto365CerebroProductCompany } from './entities/resto365-cerebro-product-company.entity';
import { Resto365CerebroProductCompanyService } from './resto365-cerebro-product-company.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateResto365CerebroProductCompanyDto } from './dto/create-resto365-cerebro-product-company.dto';
import { Resto365CerebroSyncService } from '@modules/resto365-cerebro-sync/resto365-cerebro-sync.service';
import { UpdateResto365CerebroSyncDto } from '@modules/resto365-cerebro-sync/dto/update-resto365-cerebro-sync.dto';
import { Resto365CerebroProductsService } from '@modules/resto365-cerebro-products/resto365-cerebro-products.service';
import { CreateResto365CerebroProductDto } from '@modules/resto365-cerebro-products/dto/create-cerebro-product.dto';
import { menuSectionProducts } from './dto/menu-sections.dto';
import { StoreService } from '@modules/store/store.service';
import { ChannelGroupService } from '@modules/channel-group/channel-group.service';
import { MenuContainerProductOverrideService } from '@modules/menu-container-product-override/menu-container-product-override.service';
import { CerebroSync, ContainerAction, ProductStatus } from 'src/context/enum';
import { AclGuard } from '@modules/auth/AclGuard';
import { Acl } from '@modules/auth/AclDecorator';
import { MenuTemplate } from '@modules/menu-template/entities/menu-template.entity';
import { MenuContainerProductService } from '@modules/menu-container-product/menu-container-product.service';
import {
  ChangeProductStatusDto,
  ChangeProductStatusRequest,
  ModifyingContainers,
  ModifyingProducts,
} from './dto/changeProductStatus.dto';
import { GygLog, exceptionWrapper } from 'src/shared';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { User } from '@modules/auth/UserDecorator';
import { Loglevel } from 'src/context';
import { ChannelGroupStoreService } from '@modules/channel-group-store/channel-group-store.service';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { ChannelGroupStore } from '@modules/channel-group-store/entities/channel-group-store.entity';
import { ConfigService } from '@modules/config/config.service';
import { generateMenu } from 'src/shared/service';
import { CerebroLazyLoadService } from '@modules/resto365-cerebro-lazy-loader/resto365-cerebro-lazy-loader.service';
import { Resto365CerebroLazyLoaderInterceptor } from '@modules/resto365-cerebro-lazy-loader/resto365-cerebro-lazy-loader.interceptor';
import { MenuContainerProductsDto } from './dto/getProducts.dto';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { UUID } from 'crypto';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { Resto365RestaurantService } from '@modules/resto365-restaurant/resto365-restaurant.service';
import { Resto365JobService } from '@modules/resto365-job/resto365-job.service';
import { MenuContainerService } from '@modules/menu-container/menu-container.service';
import { MenuContainer } from '@modules/menu-container/entities/menu-container.entity';
import { MenuContainerOverrideService } from '@modules/menu-container-override/menu-container-override.service';
import { CreateMenuContainerOverrideDto } from '@modules/menu-container-override/dto/create-menu-container-override.dto';
import { Resto365NotificationService } from '@modules/resto365-notification/resto365-notification.service';
import { Resto365CerebroProductCompanyOverrideService } from '@modules/resto365-cerebro-product-company-override/resto365-cerebro-product-company-override.service';
import { Statue } from 'src/shared/gygEnum';

@Audit('Restaurant/Menu')
@Controller('cerebro-product-companies')
export class Resto365CerebroProductCompanyController {
  logger: GygLog;

  constructor(
    private readonly resto365CerebroProductCompanyService: Resto365CerebroProductCompanyService,
    private readonly resto365CerebroProductsService: Resto365CerebroProductsService,
    private readonly resto365CerebroSyncService: Resto365CerebroSyncService,
    private readonly cerebroLazyLoaderService: CerebroLazyLoadService,
    private readonly storeService: StoreService,
    private readonly channelGroupService: ChannelGroupService,
    private readonly menuContainerProductService: MenuContainerProductService,
    private readonly channelGroupStoreService: ChannelGroupStoreService,
    private readonly menuContainerProductOverrideService: MenuContainerProductOverrideService,
    private readonly resto365RestaurantService: Resto365RestaurantService,
    private readonly resto365JobService: Resto365JobService,
    private readonly menuContainerService: MenuContainerService,
    private readonly menuContainerOverrideService: MenuContainerOverrideService,
    private readonly configService: ConfigService,
    private readonly notificationService: Resto365NotificationService,
    private readonly resto365CerebroProductCompanyOverrideService: Resto365CerebroProductCompanyOverrideService,
  ) {
    this.logger = new GygLog(Resto365CerebroProductCompanyController.name);
  }

  @Get('/products')
  @UseInterceptors(Resto365CerebroLazyLoaderInterceptor)
  async getProducts() {
    const { cerebroProductService } = this.cerebroLazyLoaderService.get();
    return cerebroProductService.findAll();
  }

  @Get('/company-products')
  @UseInterceptors(Resto365CerebroLazyLoaderInterceptor)
  async getCompanyProducts() {
    const { cerebroProductCompanyService } =
      this.cerebroLazyLoaderService.get();
    return cerebroProductCompanyService.findAll();
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: `Get all Cerebro's Product Companies` })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [Resto365CerebroProductCompany],
  })
  async findAll(): Promise<Resto365CerebroProductCompany[]> {
    try {
      return this.resto365CerebroProductCompanyService.findAll();
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Get('sync')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @UseInterceptors(Resto365CerebroLazyLoaderInterceptor)
  @ApiOperation({ summary: `Sync all cerebro's product Company and products` })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: String,
  })
  async syncCerebro(@User() user: Resto365User) {
    const { cerebroProductService, cerebroProductCompanyService } =
      this.cerebroLazyLoaderService.get();

    try {
      let restoCerebroSync = await this.resto365CerebroSyncService.findOne(
        CerebroSync.PRODUCTCOMPANY,
      );

      const cerebroProductCompany =
        await cerebroProductCompanyService.getDataByLastTouchDate(
          restoCerebroSync.syncDate,
        );

      const restoCerebroProductCompany =
        await this.resto365CerebroProductCompanyService.findAll();

      //upsert resto cerebroproductCompany
      if (cerebroProductCompany.length > 0) {
        const upsertingProduct: CreateResto365CerebroProductCompanyDto[] = [];

        cerebroProductCompany.forEach((productCompany) => {
          const restoProductCompany = {
            productId: productCompany.productId,
            productName: productCompany.productName,
            productNameNumber: productCompany.productNameNumber,
            categoryPk: productCompany.categoryPK,
            updatedAt: productCompany.lastTouchDate,
            createdBy: user.id,
            updatedBy: user.id,
            id: null,
          };

          const findCerebroProductCompany = restoCerebroProductCompany.find(
            (restoProductCompany) =>
              restoProductCompany.productId === productCompany.productId,
          );

          if (findCerebroProductCompany) {
            restoProductCompany.id = findCerebroProductCompany.id;
          }

          upsertingProduct.push(restoProductCompany);
        });

        const batchcerebroProduct = chunk(upsertingProduct, 50);

        for (let i = 0; i < batchcerebroProduct.length; i++) {
          const upsertProducts = batchcerebroProduct[i];
          await this.resto365CerebroProductCompanyService.upsert(
            upsertProducts,
          );
        }

        const cerebroSyncUpdate: UpdateResto365CerebroSyncDto = {
          syncDate: new Date(),
          updatedBy: user.id,
        };

        await this.resto365CerebroSyncService.update(
          CerebroSync.PRODUCTCOMPANY,
          cerebroSyncUpdate,
        );
      }

      //start syncing cerebro product
      restoCerebroSync = await this.resto365CerebroSyncService.findOne(
        CerebroSync.PRODUCT,
      );

      const cerebroProducts =
        await cerebroProductService.getDataByLastTouchDate(
          restoCerebroSync.syncDate,
        );

      //upsert resto cerebro product
      if (cerebroProducts.length > 0) {
        const restoCerebroProducts =
          await this.resto365CerebroProductsService.findAll();

        const upsertingCerebroProduct: CreateResto365CerebroProductDto[] = [];

        cerebroProducts.forEach((cerebroProduct) => {
          const product = {
            productMappingPk: cerebroProduct.productMappingPk,
            recipePlu: cerebroProduct.recipePlu,
            posPLU: cerebroProduct.posPLU,
            posProductName: cerebroProduct.posProductName,
            recipeName: cerebroProduct.recipeName,
            ingredientName: cerebroProduct.ingredientName,
            componentSequence: cerebroProduct.componentSequence,
            recipeQty: cerebroProduct.recipeQty,
            productCompanyNameNumber: cerebroProduct.productCompanyNameNumber,
            portion: cerebroProduct.portion,
            recipeCategory: cerebroProduct.recipeCategory,
            lastTouchDate: cerebroProduct.lastTouchDate,
            createdBy: user.id,
            updatedBy: user.id,
            id: null,
          };

          const findProduct = restoCerebroProducts.find(
            (product) =>
              product.productMappingPk === cerebroProduct.productMappingPk,
          );

          if (findProduct) product.id = findProduct.id;

          upsertingCerebroProduct.push(product);
        });

        const batchcerebroProduct = chunk(upsertingCerebroProduct, 50);

        for (let i = 0; i < batchcerebroProduct.length; i++) {
          const upsertProducts = batchcerebroProduct[i];
          await this.resto365CerebroProductsService.upsert(upsertProducts);
        }

        const cerebroSyncUpdate: UpdateResto365CerebroSyncDto = {
          syncDate: new Date(),
          updatedBy: user.id,
        };

        await this.resto365CerebroSyncService.update(
          CerebroSync.PRODUCT,
          cerebroSyncUpdate,
        );
      }

      return 'ok';
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Get('sections/store/:storeId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all Cerebro Product by group' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async findAllBySection(
    @Param('storeId') storeId: number,
    @User() user: Resto365User,
    @CorrelationId() correlationId: string,
  ): Promise<menuSectionProducts[]> {
    const actionName = 'GetSections';
    try {
      this.logger.writeLog(actionName, { storeId }, correlationId);

      const restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);

      //get cerebro productCompany
      const cerebroProductCompany =
        await this.resto365CerebroProductCompanyService.findAllOrderByName(
          restaurant.id,
        );

      let ingredients = compact(
        cerebroProductCompany.map((productCompany) => {
          return {
            id: productCompany.id,
            productId: productCompany.productId,
            categoryId: productCompany.categoryId,
            productName: productCompany.productName,
            productNameNumber: productCompany.productNameNumber,
            isEnable: productCompany.resto365CerebroProductCompanyOverride
              .length
              ? false
              : true,
            restoProductGroup: productCompany.resto365CerebroCategory.name,
          };
        }),
      );

      ingredients = sortBy(ingredients, ['isEnable']);

      this.logger.writeExitLog(
        actionName,
        { storeId },
        ingredients,
        correlationId,
      );
      return ingredients;
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        { storeId },
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Post('product/store/:storeId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all Menu Container Products' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async findAllByProducts(
    @Param('storeId') storeId: number,
    @User() user: Resto365User,
    @Body() changeProductStatusDto: ChangeProductStatusDto[],
    @CorrelationId() correlationId: string,
  ): Promise<AuditableResponse<MenuContainerProductsDto[]>> {
    const actionName = 'GetPrducts';
    try {
      this.logger.writeLog(
        actionName,
        { storeId: storeId, body: changeProductStatusDto },
        correlationId,
      );

      const restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);

      const bhyveId = Number(restaurant.bhyveId);

      //get menuContainerProducts
      const { allCerebroProductCompanies, allMenuContainerProducts } =
        await this.getProductsByStoreIdAndCerebroIngredients(
          bhyveId,
          changeProductStatusDto,
        );

      let menuContainerProducts = flatten(
        changeProductStatusDto.map((changeProductStatus) => {
          const { id, isEnable } = changeProductStatus;

          //get productCompany
          const cerebroProductCompany = allCerebroProductCompanies.find(
            (cerebroProductCompany) => cerebroProductCompany.id === id,
          );

          if (!cerebroProductCompany) {
            throw new Error(`cerebroProductCompany with id ${id} not found`);
          }

          //get PosPlu
          const posPlu = cerebroProductCompany.resto365CerebroProduct.map(
            (product) => product.posPLU,
          );

          //get menuContainerProducts
          const menuContainerProducts = allMenuContainerProducts.filter(
            (menuContainerProduct) =>
              posPlu.includes(menuContainerProduct.posPlu),
          );

          const menuContainerProductsDto = menuContainerProducts.map(
            (menuContainerProduct) => {
              return {
                id: menuContainerProduct.id,
                name: menuContainerProduct.name,
                description: menuContainerProduct.description,
                posPlu: menuContainerProduct.posPlu,
                isEnable: isEnable,
              };
            },
          );

          return menuContainerProductsDto;
        }),
      );

      menuContainerProducts = uniqBy(menuContainerProducts, 'posPlu');

      menuContainerProducts = sortBy(menuContainerProducts, ['isEnable']);

      this.logger.writeExitLog(
        actionName,
        { storeId },
        menuContainerProducts,
        correlationId,
      );

      return {
        data: menuContainerProducts,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: storeId,
          description: 'N/A',
        },
      };
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        { storeId },
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get('syncbhyvemenu')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'sync bhyve menu' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async findAllBySectionForAllStore(
    @User() user: Resto365User,
    @CorrelationId() correlationId: string,
  ) {
    const actionName = 'syncbhyvemenu';
    try {
      this.syncbhyvemenu(user, correlationId);
      return 'ok';
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        'Error',
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Find Cerebro Product Company by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Cerebro Product Company ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Resto365CerebroProductCompany,
  })
  @ApiResponse({
    status: 404,
    description: 'Cerebro Product Company Not Found',
  })
  async findById(
    @Param('id') id: number,
  ): Promise<Resto365CerebroProductCompany> {
    try {
      return await this.resto365CerebroProductCompanyService.findById(id);
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Put('status/store/:storeId')
  @Acl('update:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Enable/Disable Ingredients by store' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async enableDisableProduct(
    @User() user: Resto365User,
    @Body() changeProductStatusRequest: ChangeProductStatusRequest,
    @CorrelationId() correlationId: UUID,
    @Param('storeId') storeId: number,
  ): Promise<AuditableResponse<ChangeProductStatusDto[]>> {
    const actionName = 'enableDisableProduct';
    try {
      this.logger.writeLog(
        actionName,
        { changeProductStatusRequest },
        correlationId,
      );

      //* get request
      const { products: changeProductStatusDto, reason } =
        changeProductStatusRequest;

      //* restaurant is active or not
      let restaurant =
        await this.resto365RestaurantService.findRestaurant(storeId);

      //* check, if there is any menu is being generated for now
      const activeJob = await this.resto365JobService.findActiveJobsByRestoId(
        restaurant.id,
      );

      //* if any menu is being generated for now then throw error
      if (activeJob.length) {
        throw new BadRequestException(
          `Ingredients and menu are being updated. It may take up to a few minutes.`,
        );
      }

      //* get bhyve storeId
      const bhyveId = Number(restaurant.bhyveId);

      //* get menuContainerProducts By StoreId and Cerebro ingredients
      const {
        allMenuContainerProducts,
        posMenuIds,
        allCerebroProductCompanies,
        channelGroupStores,
      } = await this.getProductsByStoreIdAndCerebroIngredients(
        bhyveId,
        changeProductStatusDto,
      );

      const modifiedContainerIds: number[] = [];
      const modifyingProducts: ModifyingProducts[] = changeProductStatusDto.map(
        (changeProductStatus) => {
          try {
            const { id, isEnable, reason } = changeProductStatus;

            //* get productCompany
            const cerebroProductCompany = allCerebroProductCompanies.find(
              (cerebroProductCompany) => cerebroProductCompany.id === id,
            );

            if (!cerebroProductCompany) {
              throw new Error(`cerebroProductCompany with id ${id} not found`);
            }

            //* get PosPlu
            const posPlu = cerebroProductCompany.resto365CerebroProduct.map(
              (product) => product.posPLU,
            );

            //* get menuContainerProducts
            const menuContainerProducts = allMenuContainerProducts.filter(
              (menuContainerProduct) =>
                posPlu.includes(menuContainerProduct.posPlu),
            );

            menuContainerProducts.forEach((product) => {
              modifiedContainerIds.push(product.containerId);
            });

            if (isEnable) {
              return {
                ...changeProductStatus,
                deleteProduct: posPlu,
              };
            }

            const createMenuContainerProductOverrideDto =
              menuContainerProducts.map((product) => {
                const {
                  id: menuContainerProductId,
                  name,
                  productType,
                  partType,
                  actionType,
                  posPlu,
                  menuContainerProductAttributes,
                  menuContainerProductOverride,
                } = product;

                return menuContainerProductAttributes.map(
                  (productAttributes) => {
                    const { posMenuId } = productAttributes;

                    const createProductOverride = {
                      id: null,
                      name: name,
                      productType,
                      partType,
                      actionType,
                      storeId: bhyveId,
                      posMenuId,
                      menuContainerProductId,
                      status: Statue.disable,
                      description: reason,
                      menuContainerPosPlu: null,
                      parentMenuContainerProductPosPlu: null,
                      menuContainerProductPosPlu: posPlu,
                      createdBy: user.id,
                      updatedBy: user.id,
                    };

                    if (product.container)
                      createProductOverride.menuContainerPosPlu =
                        product.container.posPlu;

                    if (product.parentProduct)
                      createProductOverride.parentMenuContainerProductPosPlu =
                        product.parentProduct.posPlu;

                    const findProductOverride =
                      menuContainerProductOverride.find(
                        (productOverride) =>
                          productOverride.posMenuId === posMenuId,
                      );

                    if (findProductOverride)
                      createProductOverride.id = findProductOverride.id;

                    return createProductOverride;
                  },
                );
              });

            this.logger.writeExitLog(
              actionName,
              { bhyveId },
              changeProductStatus,
              correlationId,
            );

            return {
              ...changeProductStatus,
              overrideProduct: flatten(createMenuContainerProductOverrideDto),
            };
          } catch (error) {
            this.logger.writeLog(
              actionName,
              error,
              correlationId,
              Loglevel.ERROR,
            );
            return {
              ...changeProductStatus,
              isEnable: !changeProductStatus.isEnable,
            };
          }
        },
      );

      const enablingProductsPosPlu = compact(
        flatten(modifyingProducts.map((product) => product.deleteProduct)),
      );

      this.logger.writeLog(
        actionName,
        `enablingProductsPosPlu ${enablingProductsPosPlu.length}`,
        correlationId,
      );

      let disablingProducts = compact(
        flatten(modifyingProducts.map((product) => product.overrideProduct)),
      );

      this.logger.writeLog(
        actionName,
        `disablingProducts ${disablingProducts.length}`,
        correlationId,
      );

      //* delete override entries
      if (!isEmpty(enablingProductsPosPlu)) {
        await this.menuContainerProductOverrideService.remove(
          enablingProductsPosPlu,
          bhyveId,
          posMenuIds,
        );
      }

      //* create entries in override table
      if (!isEmpty(disablingProducts)) {
        disablingProducts = uniqBy(
          disablingProducts,
          (obj) => obj.posMenuId + '|' + obj.menuContainerProductId,
        );

        const products = chunk(disablingProducts, 100);

        for (let i = 0; i < products.length; i++) {
          const upsertProducts = products[i];
          await this.menuContainerProductOverrideService.upsert(upsertProducts);
        }
      }

      if (!isEmpty(modifiedContainerIds))
        await this.menuContainerEnableDisable(
          bhyveId,
          posMenuIds,
          modifiedContainerIds,
          user,
          correlationId,
        );

      //* create or delete entries in CerebroProductOverride table
      await this.createCerebroProductOverride(
        changeProductStatusDto,
        storeId,
        user,
      );

      restaurant =
        await this.resto365RestaurantService.updateNeedMenuGenerateFlag(
          restaurant.id,
          Number(true),
          correlationId,
        );

      //* generate menu
      await generateMenu(
        channelGroupStores,
        restaurant,
        this.configService.bhyveConfig.bhvyeHttp,
        this.logger,
        this.resto365JobService,
        this.resto365RestaurantService,
        user,
        correlationId,
      );

      this.notificationService.sendNotification({
        category: 'menu',
        message: `Menu generation is submitted`,
        userId: user.id,
      });

      return {
        data: changeProductStatusDto,
        _metadata: {
          entitySource: EntitySource.Restaurant,
          entitySourceId: storeId,
          description: reason ? reason : 'N/A',
        },
      };
    } catch (error) {
      this.logger.writeExitLog(
        actionName,
        { changeProductStatusRequest },
        error,
        correlationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  getchannelGroupStores = async (
    storeId: number,
  ): Promise<ChannelGroupStore[]> => {
    try {
      const store = await this.storeService.findById(storeId);
      if (!store) {
        throw new NotFoundException(`store with storeId ${storeId} not found`);
      }

      const channelGroupStores =
        await this.channelGroupStoreService.findAllByStoreId(store.id);

      return channelGroupStores;
    } catch (error) {
      throw error;
    }
  };

  getMenuTemplate = async (
    channelGroupStores: ChannelGroupStore[],
  ): Promise<MenuTemplate[]> => {
    try {
      const groupIds = channelGroupStores.map(
        (channelGroupStore) => channelGroupStore.groupId,
      );

      const channelIds = channelGroupStores.map(
        (channelGroupStore) => channelGroupStore.channelId,
      );

      const channelGroups =
        await this.channelGroupService.findAllByGroupIdAndChannelId(
          groupIds,
          channelIds,
        );

      const menuTemplates = flatten(
        channelGroups.map((channelGroup) => channelGroup.menuTemplate),
      );

      if (!menuTemplates.length) {
        throw new NotFoundException(`menuTemplates not found`);
      }

      return menuTemplates;
    } catch (error) {
      throw error;
    }
  };

  getProductsByStoreIdAndCerebroIngredients = async (
    storeId: number,
    changeProductStatusDto: ChangeProductStatusDto[],
  ) => {
    try {
      //get ChannelGroupStores
      const channelGroupStores = await this.getchannelGroupStores(storeId);

      //get MenuTemplate
      const menuTemplates = await this.getMenuTemplate(channelGroupStores);

      //get request productIds
      const productIds = changeProductStatusDto.map(
        (changeProductStatus) => changeProductStatus.id,
      );

      //get cerebro productCompany
      const allCerebroProductCompanies =
        await this.resto365CerebroProductCompanyService.findAllByIds(
          productIds,
        );

      //get cerebroProduct
      const allCerebroProducts = flatten(
        allCerebroProductCompanies.map(
          (cerebroProduct) => cerebroProduct.resto365CerebroProduct,
        ),
      );

      const cerebroProductPosplu = allCerebroProducts.map(
        (cerebroProduct) => cerebroProduct.posPLU,
      );

      const posMenuIds = menuTemplates.map(
        (menuTemplate) => menuTemplate.posMenuId,
      );

      //get menuContainerProducts
      const allMenuContainerProducts =
        await this.menuContainerProductService.findByPosPlu(
          cerebroProductPosplu,
          posMenuIds,
          storeId,
        );

      return {
        allMenuContainerProducts,
        allCerebroProductCompanies,
        posMenuIds,
        channelGroupStores,
      };
    } catch (error) {
      throw error;
    }
  };

  seachFilter = (value: unknown, regExp: unknown): boolean => {
    if (value !== null && value !== undefined) return value === regExp;
    else return true;
  };

  menuContainerEnableDisable = async (
    storeId: number,
    posMenuIds: number[],
    productContainerIds: number[],
    user: Resto365User,
    correlationId: string,
  ) => {
    const actionName = 'menuContainerEnableDisable';
    try {
      //* get all containers by posMenuIds
      const containers = await this.menuContainerService.findAllByPosMenuId(
        posMenuIds,
        storeId,
      );

      this.logger.writeLog(
        actionName,
        `containers ${containers.length}`,
        correlationId,
      );

      const productContainers = containers.filter((container) =>
        productContainerIds.includes(container.id),
      );

      //* get all products
      const products = await this.menuContainerProductService.findByContainerId(
        productContainerIds,
        posMenuIds,
        storeId,
      );

      this.logger.writeLog(
        actionName,
        `products ${products.length}`,
        correlationId,
      );

      const createOverrideContainerDTO = this.createMenuContainerOverrideDTO;

      function containerCheck(
        container: MenuContainer,
        containerAction: ContainerAction,
      ): ModifyingContainers {
        //* if category has type Category and MultipartSection, then it will have products
        let parentContainers: ModifyingContainers = {
          deleteContainer: [],
          overrideContainer: [],
        };

        if (containerAction === ContainerAction.IS_PRODUCTCHECK) {
          //* get all container's product
          const containerProducts = products.filter(
            (product) => product.containerId === container.id,
          );

          if (!isEmpty(containerProducts)) {
            const activeProducts = containerProducts.filter(
              (product) =>
                product.menuContainerProductOverride.length !==
                product.menuContainerProductAttributes.length,
            );

            //* check container has products or not
            if (isEmpty(activeProducts)) {
              //* find parents container
              if (container.parentContainerId) {
                const findParentContainer = containers.find(
                  (c) => c.id === container.parentContainerId,
                );
                parentContainers = containerCheck(
                  findParentContainer,
                  ContainerAction.IS_DISABLE,
                );
              }

              //create conatiner oveeride
              const overrideContainer = createOverrideContainerDTO(
                container,
                storeId,
                user,
              );

              return {
                overrideContainer: [
                  ...parentContainers.overrideContainer,
                  ...overrideContainer,
                ],
                deleteContainer: parentContainers.deleteContainer,
              };
            } else {
              if (container.menuContainerOverride.length) {
                if (container.parentContainerId) {
                  const findParentContainer = containers.find(
                    (c) => c.id === container.parentContainerId,
                  );

                  parentContainers = containerCheck(
                    findParentContainer,
                    ContainerAction.IS_ENABLE,
                  );
                }

                const deleteContainer = container.menuContainerOverride.map(
                  (override) => override.id,
                );

                return {
                  deleteContainer: [
                    ...deleteContainer,
                    ...parentContainers.deleteContainer,
                  ],
                  overrideContainer: parentContainers.overrideContainer,
                };
              }
            }
          } else {
            throw new Error(`something went wrong ${container.id}`);
          }
        } else if (containerAction === ContainerAction.IS_DISABLE) {
          //* find parents container
          if (container.parentContainerId) {
            const findParentContainer = containers.find(
              (c) => c.id === container.parentContainerId,
            );
            parentContainers = containerCheck(
              findParentContainer,
              ContainerAction.IS_DISABLE,
            );
          }

          const overrideContainer = createOverrideContainerDTO(
            container,
            storeId,
            user,
          );

          return {
            overrideContainer: [
              ...parentContainers.overrideContainer,
              ...overrideContainer,
            ],
            deleteContainer: parentContainers.deleteContainer,
          };
        } else {
          if (container.menuContainerOverride.length) {
            if (container.parentContainerId) {
              const findParentContainer = containers.find(
                (c) => c.id === container.parentContainerId,
              );

              parentContainers = containerCheck(
                findParentContainer,
                ContainerAction.IS_ENABLE,
              );
            }

            const deleteContainer = container.menuContainerOverride.map(
              (override) => override.id,
            );

            return {
              deleteContainer: [
                ...deleteContainer,
                ...parentContainers.deleteContainer,
              ],
              overrideContainer: parentContainers.overrideContainer,
            };
          }
        }
      }

      const modifyingContainers = compact(
        productContainers.map((container) => {
          return containerCheck(container, ContainerAction.IS_PRODUCTCHECK);
        }),
      );

      const disablingContainers = flatten(
        compact(
          modifyingContainers.map((container) => container.overrideContainer),
        ),
      );

      this.logger.writeLog(
        actionName,
        `disablingContainers ${disablingContainers.length}`,
        correlationId,
      );

      const enablingContainers = flatten(
        compact(
          modifyingContainers.map((container) => container.deleteContainer),
        ),
      );

      this.logger.writeLog(
        actionName,
        `enablingContainers ${enablingContainers.length}`,
        correlationId,
      );

      //* delete override entries
      if (!isEmpty(enablingContainers)) {
        await this.menuContainerOverrideService.removeByIds(enablingContainers);
      }

      //* create entries in override table
      if (!isEmpty(disablingContainers)) {
        const containers = chunk(disablingContainers, 100);

        containers.forEach(async (upsertContainer) => {
          await this.menuContainerOverrideService.upsert(upsertContainer);
        });
      }
    } catch (error) {
      throw error;
    }
  };

  createMenuContainerOverrideDTO = (
    container: MenuContainer,
    storeId: number,
    user: Resto365User,
  ): CreateMenuContainerOverrideDto[] => {
    const {
      posPlu,
      name,
      description,
      menuContainerAttributes,
      menuContainerOverride,
    } = container;

    const overrideContainer = menuContainerAttributes.map(
      (menuContainerAttribute) => {
        const findOverride = menuContainerOverride.find(
          (containerOverride) =>
            containerOverride.menuContainerPosPlu === posPlu &&
            containerOverride.posMenuId === menuContainerAttribute.posMenuId,
        );

        const createMenuContainerOverride = {
          id: null,
          name: name,
          menuContainerPosPlu: posPlu,
          storeId,
          posMenuId: menuContainerAttribute.posMenuId,
          description,
          status: Statue.disable,
          price: menuContainerAttribute.price,
          createdBy: user.id,
          updatedBy: user.id,
        };

        if (findOverride) createMenuContainerOverride.id = findOverride.id;

        return createMenuContainerOverride;
      },
    );

    return overrideContainer;
  };

  createCerebroProductOverride = async (
    changeProductStatusDto: ChangeProductStatusDto[],
    storeId: number,
    user: Resto365User,
  ) => {
    const enablingProductIds = changeProductStatusDto
      .filter((product) => product.isEnable)
      .map((product) => product.id);

    const disablingProductIds = changeProductStatusDto
      .filter((product) => !product.isEnable)
      .map((product) => product.id);

    if (disablingProductIds.length) {
      const cerebroProductOverrides =
        await this.resto365CerebroProductCompanyOverrideService.findAllByCerebroProductCompanyIds(
          storeId,
          disablingProductIds,
        );

      const cerebroProductOverrideDto = disablingProductIds.map((product) => {
        const findOverride = cerebroProductOverrides.find(
          (productOveeride) =>
            productOveeride.cerebroProductCompanyId === product,
        );

        const dto = {
          id: null,
          restaurantId: storeId,
          cerebroProductCompanyId: product,
          status: ProductStatus.DISABLE,
          createdBy: user.id,
          updatedBy: user.id,
        };

        if (findOverride) dto.id = findOverride.id;

        return dto;
      });

      if (cerebroProductOverrideDto.length) {
        await this.resto365CerebroProductCompanyOverrideService.upsert(
          cerebroProductOverrideDto,
        );
      }
    }

    if (enablingProductIds.length) {
      await this.resto365CerebroProductCompanyOverrideService.remove(
        storeId,
        enablingProductIds,
      );
    }
  };

  syncbhyvemenu = async (user: Resto365User, correlationId: string) => {
    try {
      const actionName = 'syncbhyvemenu';
      const restaurants = await this.resto365RestaurantService.findAll();

      this.logger.writeLog(
        actionName,
        `restaurants = ${restaurants.length}`,
        correlationId,
      );

      const bhyveIds = restaurants.map((restaurant) =>
        Number(restaurant.bhyveId),
      );

      const channelGroupStores =
        await this.channelGroupStoreService.findAllByStoreIds(bhyveIds);

      const menuTemplates = await this.getMenuTemplate(channelGroupStores);

      const posMenuIds = menuTemplates.map(
        (menuTemplate) => menuTemplate.posMenuId,
      );

      //get cerebro productCompany
      const cerebroProductCompany =
        await this.resto365CerebroProductCompanyService.getCerebroProductCompany();

      //get cerebroProduct
      const allCerebroProducts = flatten(
        cerebroProductCompany.map(
          (cerebroProduct) => cerebroProduct.resto365CerebroProduct,
        ),
      );

      //get cerebroProduct posPlu
      const cerebroProductPosplu = allCerebroProducts.map(
        (cerebroProduct) => cerebroProduct.posPLU,
      );

      //get menuContainerProducts
      const menuContainerProducts =
        await this.menuContainerProductService.findByPosPluForAllStore(
          cerebroProductPosplu,
          posMenuIds,
          bhyveIds,
        );

      const allOverrideProducts =
        await this.resto365CerebroProductCompanyOverrideService.findAll();

      const promise = restaurants.map(async (restaurant) => {
        const { id, bhyveId } = restaurant;

        const channelGroupStore = channelGroupStores.filter(
          (cgs) => cgs.storeId === Number(bhyveId),
        );

        if (!channelGroupStore.length) {
          return [];
        }

        const menuTemplate = await this.getMenuTemplate(channelGroupStore);

        const posMenuIds = menuTemplate.map(
          (menuTemplate) => menuTemplate.posMenuId,
        );

        let filterMenuContainerProducts = menuContainerProducts.map(
          (menuContainerProduct) => {
            const storeMenuContainerProductOverride =
              menuContainerProduct.menuContainerProductOverride.filter(
                (po) => po.storeId === Number(bhyveId),
              );

            const storeMenuContainerProductAttributes =
              menuContainerProduct.menuContainerProductAttributes.filter((pa) =>
                posMenuIds.includes(pa.posMenuId),
              );

            return {
              ...menuContainerProduct,
              menuContainerProductOverride: storeMenuContainerProductOverride,
              menuContainerProductAttributes:
                storeMenuContainerProductAttributes,
            };
          },
        );

        filterMenuContainerProducts = filterMenuContainerProducts.filter(
          (product) => product.menuContainerProductAttributes.length > 0,
        );

        const dto = compact(
          cerebroProductCompany.map((productCompany) => {
            //get product posPlu
            const cerebroProductPosPlu =
              productCompany.resto365CerebroProduct.map(
                (product) => product.posPLU,
              );

            //get menuContainerProductOverride by cerebroProduct
            const filterProduct = filterMenuContainerProducts.filter(
              (product) => cerebroProductPosPlu.includes(product.posPlu),
            );

            if (cerebroProductPosPlu.length && filterProduct.length) {
              const filterProductOverrides = filterProduct.filter(
                (product) => product.menuContainerProductOverride.length > 0,
              );

              // if we are having same length in override table and cerebro product then we will disable it
              const isEnable =
                filterProductOverrides.length === filterProduct.length
                  ? false
                  : true;

              if (!isEnable) {
                const checkOverride = allOverrideProducts.find(
                  (override) =>
                    override.restaurantId == id &&
                    override.cerebroProductCompanyId == productCompany.id,
                );

                if (!checkOverride) {
                  return {
                    id: null,
                    restaurantId: id,
                    cerebroProductCompanyId: productCompany.id,
                    status: ProductStatus.DISABLE,
                    createdBy: user.id,
                    updatedBy: user.id,
                  };
                }
              }
            }
            return null;
          }),
        );

        return dto;
      });

      const cerebroProductOverrides = flatten(await Promise.all(promise));

      const batchcerebroProductOverride = chunk(cerebroProductOverrides, 50);

      for (let i = 0; i < batchcerebroProductOverride.length; i++) {
        const upsertProductOverride = batchcerebroProductOverride[i];

        await this.resto365CerebroProductCompanyOverrideService.upsert(
          upsertProductOverride,
        );
      }
    } catch (error) {}
  };
}
