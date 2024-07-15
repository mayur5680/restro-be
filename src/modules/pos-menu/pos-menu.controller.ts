import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PosMenuService } from './pos-menu.service';
import { PosMenu } from './entities/pos-menu.entity';
import { CreatePosMenuDto } from './dto/create-pos-menu.dto';
import { UpdatePosMenuDto } from './dto/update-pos-menu.dto';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GygLog, exceptionWrapper } from 'src/shared';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Loglevel } from 'src/context';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('pos-menu')
export class PosMenuController {
  logger: GygLog;
  constructor(private readonly posMenuService: PosMenuService) {
    this.logger = new GygLog(PosMenuController.name);
  }

  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get all PosMenu' })
  @ApiResponse({ status: 200, description: 'OK', type: [PosMenu] })
  @ApiResponse({ status: 404, description: 'PosMenu Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@CorrelationId() corelationId: string): Promise<PosMenu[]> {
    try {
      return await this.posMenuService.findAll();
    } catch (error) {
      this.logger.writeLog(
        'findAll',
        error.message,
        corelationId,
        Loglevel.INFO,
      );
      exceptionWrapper(error);
    }
  }

  @Get(':id')
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Get PosMenu by id' })
  @ApiQuery({
    name: 'id',
    type: 'number',
    description: 'PosMenu Id',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'OK', type: PosMenu })
  @ApiResponse({ status: 404, description: 'PosMenu Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(
    @Param('id') id: string,
    @CorrelationId() corelationId: string,
  ): Promise<PosMenu> {
    try {
      return await this.posMenuService.findOne(+id);
    } catch (error) {
      this.logger.writeLog(
        'findOne',
        error.message,
        corelationId,
        Loglevel.INFO,
      );
      exceptionWrapper(error);
    }
  }

  @Post()
  @Acl('create:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Create PosMenu' })
  @ApiResponse({ status: 201, description: 'Created', type: PosMenu })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createPosMenuDto: CreatePosMenuDto,
    @CorrelationId() corelationId: string,
    @User() user: Resto365User,
  ): Promise<PosMenu> {
    try {
      return await this.posMenuService.create({
        ...createPosMenuDto,
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
  @ApiOperation({ summary: 'Update an existing PosMenu' })
  @ApiResponse({ status: 200, description: 'OK', type: PosMenu })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updatePosMenuDto: UpdatePosMenuDto,
  ): Promise<PosMenu> {
    try {
      return await this.posMenuService.update(+id, updatePosMenuDto);
    } catch (error) {
      exceptionWrapper(error);
    }
  }

  @Delete(':id')
  @Acl('delete:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: 'Delete an existing PosMenu' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.posMenuService.remove(+id);
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
