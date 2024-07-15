import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { GygQueryOptions } from './types';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(
    @Query() options: GygQueryOptions,
  ): Promise<{ data: Tag[]; meta: { totalRows: number; pages: number } }> {
    return this.tagService.findAll(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tag | undefined> {
    return this.tagService.findOne(id);
  }
}
