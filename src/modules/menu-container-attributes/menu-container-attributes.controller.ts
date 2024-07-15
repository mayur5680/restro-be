import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MenuContainerAttributesService } from './menu-container-attributes.service';
import { CreateMenuContainerAttributeDto } from './dto/create-menu-container-attribute.dto';
import { UpdateMenuContainerAttributeDto } from './dto/update-menu-container-attribute.dto';
import { MenuContainerAttributes } from './entities/menu-container-attribute.entity';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GygLog, exceptionWrapper } from 'src/shared';
import { Loglevel } from 'src/context';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('menu-container-attributes')
export class MenuContainerAttributesController {
  logger: GygLog;
  constructor(
    private readonly menuContainerAttributesService: MenuContainerAttributesService,
  ) {
    this.logger = new GygLog(MenuContainerAttributesController.name);
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all MenuContainerAttributes' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [MenuContainerAttributes],
  })
  @ApiResponse({
    status: 404,
    description: 'MenuContainerAttributes Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CorrelationId() corelationId: string) {
    try {
      this.logger.writeLog('findAll', 'start', corelationId, Loglevel.INFO);
      const result =
        await this.menuContainerAttributesService.findAll(corelationId);
      this.logger.writeLog('findAl', 'finish', corelationId, Loglevel.INFO);
      return result;
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get a MenuContainerAttribute' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuContainerAttributes,
  })
  @ApiResponse({
    status: 404,
    description: 'MenuContainerAttribute Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: number,
    @CorrelationId() corelationId: string,
  ): Promise<MenuContainerAttributes> {
    try {
      this.logger.writeLog(
        'findOne called',
        'findOne',
        corelationId,
        Loglevel.INFO,
      );
      const menuContainerAttribute =
        await this.menuContainerAttributesService.findOne(id, corelationId);
      if (!menuContainerAttribute) {
        throw new NotFoundException(
          `MenuContainerAttribute with ID ${id} not found`,
        );
      }
      this.logger.writeLog(
        'findOne result',
        'findOne',
        corelationId,
        Loglevel.INFO,
      );
      return menuContainerAttribute;
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Post()
  @Acl('create:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create a MenuContainerAttribute' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: MenuContainerAttributes,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createMenuContainerAttributeDto: CreateMenuContainerAttributeDto,
    @CorrelationId() corelationId: string,
    @User() user: Resto365User,
  ): Promise<MenuContainerAttributes> {
    try {
      this.logger.writeLog(
        'create called',
        'create',
        corelationId,
        Loglevel.INFO,
      );
      const menuContainerAttribute =
        await this.menuContainerAttributesService.create(
          {
            ...createMenuContainerAttributeDto,
            createdBy: user.id,
            updatedBy: user.id,
          },
          corelationId,
        );
      this.logger.writeLog(
        'create result',
        'create',
        corelationId,
        Loglevel.INFO,
      );
      return menuContainerAttribute;
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }

  @Patch(':id')
  @Acl('update:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Update a MenuContainerAttribute' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuContainerAttributes,
  })
  @ApiResponse({
    status: 404,
    description: 'MenuContainerAttribute Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() updateMenuContainerAttributeDto: UpdateMenuContainerAttributeDto,
    @CorrelationId() corelationId: string,
    @User() user: Resto365User,
  ): Promise<MenuContainerAttributes> {
    try {
      this.logger.writeLog(
        'update called',
        'update',
        corelationId,
        Loglevel.INFO,
      );
      const menuContainerAttribute =
        await this.menuContainerAttributesService.update(
          id,
          {
            ...updateMenuContainerAttributeDto,
            updatedBy: user.id,
          },
          corelationId,
        );
      this.logger.writeLog(
        'update result',
        'update',
        corelationId,
        Loglevel.INFO,
      );
      return menuContainerAttribute;
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }
}
