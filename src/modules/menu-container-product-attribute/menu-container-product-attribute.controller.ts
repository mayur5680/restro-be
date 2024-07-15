import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuContainerProductAttributeService } from './menu-container-product-attribute.service';
import { MenuContainerProductAttributes } from './entities/menu-container-product-attribute.entity';
import { CreateMenuContainerProductAttributeDto } from './dto/create-menu-container-product-attribute.dto';
import { UpdateMenuContainerProductAttributeDto } from './dto/update-menu-container-product-attribute.dto';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GygLog, exceptionWrapper } from 'src/shared';
import { Loglevel } from 'src/context';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('menu-container-product-attributes')
export class MenuContainerProductAttributeController {
  logger: GygLog;
  constructor(
    private readonly menuContainerProductAttributeService: MenuContainerProductAttributeService,
  ) {
    this.logger = new GygLog(MenuContainerProductAttributeController.name);
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all MenuContainerProductAttributes' })
  @ApiQuery({
    name: 'menuContainerProductId',
    required: false,
    type: 'number',
    description: 'MenuContainerProductId',
  })
  @ApiQuery({
    name: 'posMenuId',
    required: false,
    type: 'number',
    description: 'PosMenuId',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [MenuContainerProductAttributes],
  })
  @ApiResponse({
    status: 404,
    description: 'MenuContainerProductAttributes Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(
    @Query()
    queryParams: {
      menuContainerProductId?: string;
      posMenuId?: string;
    },
    @CorrelationId() corelationId: string,
  ): Promise<MenuContainerProductAttributes[]> {
    try {
      const { menuContainerProductId, posMenuId } = queryParams;
      if (menuContainerProductId && posMenuId) {
        return this.menuContainerProductAttributeService.findAllByMenuContainerProductIdAndPosMenuId(
          parseInt(menuContainerProductId),
          parseInt(posMenuId),
        );
      } else if (menuContainerProductId) {
        return this.menuContainerProductAttributeService.findAllByMenuContainerProductId(
          parseInt(menuContainerProductId),
        );
      } else if (posMenuId) {
        return this.menuContainerProductAttributeService.findAllByPosMenuId(
          parseInt(posMenuId),
        );
      } else {
        return this.menuContainerProductAttributeService.findAll();
      }
    } catch (error) {
      this.logger.writeLog(
        'findAll',
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get MenuContainerProductAttribute by id' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'number',
    description: 'MenuContainerProductAttribute Id',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuContainerProductAttributes,
  })
  @ApiResponse({
    status: 404,
    description: 'MenuContainerProductAttribute Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(
    @Param('id') id: string,
    @CorrelationId() corelationId: string,
  ): Promise<MenuContainerProductAttributes> {
    try {
      return this.menuContainerProductAttributeService.findOne(+id);
    } catch (error) {
      this.logger.writeLog(
        'findOne',
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Post()
  @Acl('create:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create MenuContainerProductAttribute' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: MenuContainerProductAttributes,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body()
    createMenuContainerProductAttributeDto: CreateMenuContainerProductAttributeDto,
    @CorrelationId() corelationId: string,
    @User() user: Resto365User,
  ): Promise<MenuContainerProductAttributes> {
    try {
      return this.menuContainerProductAttributeService.create({
        ...createMenuContainerProductAttributeDto,
        createdBy: user.id,
        updatedBy: user.id,
      });
    } catch (error) {
      this.logger.writeLog(
        'create',
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update an existing MenuContainerProductAttribute' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuContainerProductAttributes,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body()
    updateMenuContainerProductAttributeDto: UpdateMenuContainerProductAttributeDto,
    @CorrelationId() corelationId: string,
    @User() user: Resto365User,
  ): Promise<MenuContainerProductAttributes> {
    try {
      return this.menuContainerProductAttributeService.update(+id, {
        ...updateMenuContainerProductAttributeDto,
        updatedBy: user.id,
      });
    } catch (error) {
      this.logger.writeLog(
        'update',
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete an existing MenuContainerProductAttribute' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(
    @Param('id') id: string,
    @CorrelationId() corelationId: string,
  ): Promise<void> {
    try {
      return this.menuContainerProductAttributeService.remove(+id);
    } catch (error) {
      this.logger.writeLog(
        'remove',
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }
}
