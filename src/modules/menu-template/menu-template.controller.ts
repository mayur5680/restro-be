import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MenuTemplateService } from './menu-template.service';
import { MenuTemplate } from './entities/menu-template.entity';
import { exceptionWrapper } from 'src/shared';

@Controller('menu-templates')
export class MenuTemplateController {
  constructor(private readonly menuTemplateService: MenuTemplateService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MenuTemplate> {
    try {
      const menuTemplate = await this.menuTemplateService.findOne(+id);
      return menuTemplate;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      exceptionWrapper(error);
    }
  }

  @Get()
  async findAll(): Promise<MenuTemplate[]> {
    const menuTemplates = await this.menuTemplateService.findAll();
    return menuTemplates;
  }
}
