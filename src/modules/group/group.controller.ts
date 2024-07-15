import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { exceptionWrapper } from 'src/shared';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    try {
      const group = await this.groupService.findOne(+id);
      return group;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      exceptionWrapper(error);
    }
  }

  @Get()
  async findAll(): Promise<Group[]> {
    const groups = await this.groupService.findAll();
    return groups;
  }
}
