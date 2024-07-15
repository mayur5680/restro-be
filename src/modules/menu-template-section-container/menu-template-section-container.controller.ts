import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { MenuTemplateSectionContainerService } from './menu-template-section-container.service';
import { MenuTemplateSectionContainer } from './entities/menu-template-section-container.entity';
import { CreateMenuTemplateSectionContainerDto } from './dto/create-menu-template-section-container.dto';
import { GygLog, exceptionWrapper } from 'src/shared';
import { Loglevel } from 'src/context';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UpdateMenuTemplateSectionContainerDto } from './dto/update-menu-template-section-container.dto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('menu-template-section-container')
export class MenuTemplateSectionContainerController {
  logger: GygLog;
  constructor(
    private readonly menuTemplateSectionContainerService: MenuTemplateSectionContainerService,
  ) {
    this.logger = new GygLog(MenuTemplateSectionContainerController.name);
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all MenuTemplateSectionContainers' })
  @ApiQuery({
    name: 'menuTemplateSectionId',
    required: false,
    type: 'number',
    description: 'MenuTemplateSectionId',
  })
  @ApiQuery({
    name: 'menuContainerPosPlu',
    required: false,
    type: 'number',
    description: 'MenuContainerPosPlu',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [MenuTemplateSectionContainer],
  })
  @ApiResponse({
    status: 404,
    description: 'MenuTemplateSectionContainer Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('menuTemplateSectionId') menuTemplateSectionId?: number,
    @Query('menuContainerPosPlu') menuContainerPosPlu?: number,
    @CorrelationId() corelationId?: string,
  ): Promise<MenuTemplateSectionContainer[]> {
    const actionName = 'findAll';
    try {
      if (menuTemplateSectionId && menuContainerPosPlu) {
        // Handle query with both menuTemplateSectionId and menuContainerPosPlu
        this.logger.writeLog(
          actionName,
          'Both menuTemplateSectionId and menuContainerPosPlu provided',
          corelationId,
          Loglevel.DEBUG,
        );
        return this.menuTemplateSectionContainerService.findByMenuTemplateSectionIdAndMenuContainerPosPlu(
          menuTemplateSectionId,
          menuContainerPosPlu,
        );
      } else if (menuTemplateSectionId) {
        // Handle query with only menuTemplateSectionId
        this.logger.writeLog(
          actionName,
          'Only menuTemplateSectionId provided',
          corelationId,
          Loglevel.DEBUG,
        );
        return this.menuTemplateSectionContainerService.findByMenuTemplateSectionId(
          menuTemplateSectionId,
        );
      } else if (menuContainerPosPlu) {
        // Handle query with only menuContainerPosPlu
        this.logger.writeLog(
          actionName,
          'Only menuContainerPosPlu provided',
          corelationId,
          Loglevel.DEBUG,
        );
        return this.menuTemplateSectionContainerService.findByMenuContainerPosPlu(
          menuContainerPosPlu,
        );
      } else {
        // Handle query with no filters
        this.logger.writeLog(
          actionName,
          'No filters provided',
          corelationId,
          Loglevel.DEBUG,
        );
        return this.menuTemplateSectionContainerService.findAll();
      }
    } catch (error) {
      this.logger.writeLog(
        actionName,
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
  @ApiOperation({ summary: 'Get MenuTemplateSectionContainer by Id' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: 'number',
    description: 'MenuTemplateSectionContainer ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuTemplateSectionContainer,
  })
  @ApiResponse({
    status: 404,
    description: 'MenuTemplateSectionContainer Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: number,
    @CorrelationId() corelationId: string,
  ): Promise<MenuTemplateSectionContainer> {
    const actionName = 'findOne';
    try {
      this.logger.writeLog(
        actionName,
        'Get MenuTemplateSectionContainer by Id',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.menuTemplateSectionContainerService.findOne(id);
    } catch (error) {
      this.logger.writeLog(
        actionName,
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
  @ApiOperation({ summary: 'Update an existing MenuTemplateSectionContainer' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: MenuTemplateSectionContainer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateMenuTemplateSectionContainerDto,
    @CorrelationId() corelationId: string,
  ): Promise<MenuTemplateSectionContainer> {
    const actionName = 'update';
    try {
      this.logger.writeLog(
        actionName,
        'Update an existing MenuTemplateSectionContainer',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.menuTemplateSectionContainerService.update(id, updateDto);
    } catch (error) {
      this.logger.writeLog(
        actionName,
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
  @ApiOperation({ summary: 'Create a MenuTemplateSectionContainer' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: MenuTemplateSectionContainer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body()
    createMenuTemplateSectionContainerDto: CreateMenuTemplateSectionContainerDto,
  ): Promise<MenuTemplateSectionContainer> {
    try {
      return this.menuTemplateSectionContainerService.create(
        createMenuTemplateSectionContainerDto,
      );
    } catch (error) {
      this.logger.writeLog('create', error.message, null, Loglevel.ERROR);
      exceptionWrapper(error);
    }
  }

  @Get(':sectionId')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get MenuTemplateSectionContainer by sectionId' })
  @ApiQuery({
    name: 'sectionId',
    required: true,
    type: 'number',
    description: 'sectionId',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [MenuTemplateSectionContainer],
  })
  @ApiResponse({
    status: 404,
    description: 'MenuTemplateSectionContainer Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findBySectionId(
    @Param('sectionId') sectionId: number,
    @CorrelationId() corelationId: string,
  ): Promise<MenuTemplateSectionContainer[]> {
    const actionName = 'findBySectionId';
    try {
      this.logger.writeLog(
        actionName,
        'Get MenuTemplateSectionContainer by sectionId',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.menuTemplateSectionContainerService.findByMenuTemplateSectionId(
        sectionId,
      );
    } catch (error) {
      this.logger.writeLog(
        actionName,
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }

  @Get(':containerPosPlu')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({
    summary: 'Get MenuTemplateSectionContainer by containerPosPlu',
  })
  @ApiQuery({
    name: 'containerPosPlu',
    required: true,
    type: 'number',
    description: 'containerPosPlu',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [MenuTemplateSectionContainer],
  })
  @ApiResponse({
    status: 404,
    description: 'MenuTemplateSectionContainer Not Found',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findByContainerPosPlu(
    @Param('containerPosPlu') containerPosPlu: number,
    @CorrelationId() corelationId: string,
  ): Promise<MenuTemplateSectionContainer[]> {
    const actionName = 'findByContainerPosPlu';
    try {
      this.logger.writeLog(
        actionName,
        'Get MenuTemplateSectionContainer by containerPosPlu',
        corelationId,
        Loglevel.DEBUG,
      );
      return this.menuTemplateSectionContainerService.findByMenuContainerPosPlu(
        containerPosPlu,
      );
    } catch (error) {
      this.logger.writeLog(
        actionName,
        error.message,
        corelationId,
        Loglevel.ERROR,
      );
      exceptionWrapper(error);
    }
  }
}
