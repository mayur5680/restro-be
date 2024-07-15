import { Controller, Get, UseGuards } from '@nestjs/common';
import { Resto365EquipmentCategoryService } from './resto365-equipment-category.service';
import { AclGuard } from '@modules/auth/AclGuard';
import { Acl } from '@modules/auth/AclDecorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Resto365EquipmentCategory } from './entities/resto365-equipment-category.entity';
import { exceptionWrapper } from 'src/shared';

@Controller('resto365-equipment-category')
export class Resto365EquipmentCategoryController {
  constructor(
    private readonly resto365EquipmentCategoryService: Resto365EquipmentCategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all equipment categories' })
  @ApiResponse({ status: 200, description: 'Return all equipment categories' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AclGuard)
  @Acl('read:equipment')
  findAll(): Promise<Resto365EquipmentCategory[]> {
    try {
      return this.resto365EquipmentCategoryService.findAll();
    } catch (error) {
      throw exceptionWrapper(error);
    }
  }
}
