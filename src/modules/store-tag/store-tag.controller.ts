import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateStoreTagDto } from './dto/create-store-tag.dto';
import { UpdateStoreTagDto } from './dto/update-store-tag.dto';
import { StoreTagService } from './store-tag.service';
import { StoreTag } from './entities/store-tag.entity';
import { number } from 'yup';
import { ApiQuery } from '@nestjs/swagger';
import { GygQueryOptions } from '@modules/tag/types';
import { User } from '@modules/auth/UserDecorator';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Controller('store-tags')
export class StoreTagController {
  constructor(private readonly storeTagService: StoreTagService) {}

  @Post()
  create(
    @Body() createStoreTagDto: CreateStoreTagDto,
    @User() user,
    @CorrelationId() correlationId,
  ): Promise<StoreTag> {
    return this.storeTagService.create(createStoreTagDto, {
      _metadata: { auditUser: user, correlationId: correlationId },
    });
  }

  @Get()
  @ApiQuery({ name: 'skip', type: number })
  @ApiQuery({ name: 'take', type: number })
  findAll(@Query() query: GygQueryOptions) {
    if (query.store && query.tag) {
      // Handle the case when both store and tag parameters are present
      return this.storeTagService.findAllByStoreIdAndTagId(
        Number(query.store),
        Number(query.tag),
      );
    } else if (query.store) {
      // Handle the case when only the store parameter is present
      return this.storeTagService.findAllByStoreId(Number(query.store));
    } else if (query.tag) {
      // Handle the case when only the tag parameter is present
      return this.storeTagService.findAllByTagId(Number(query.tag));
    } else {
      // Handle the default case when no specific parameters are provided
      return this.storeTagService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StoreTag> {
    return this.storeTagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStoreTagDto: UpdateStoreTagDto,
  ): Promise<StoreTag> {
    return this.storeTagService.update(id, updateStoreTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.storeTagService.remove(id);
  }
}
