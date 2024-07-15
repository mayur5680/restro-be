import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MenuTemplate } from './entities/menu-template.entity';

@Injectable()
export class MenuTemplateService {
  constructor(
    @InjectRepository(MenuTemplate)
    private readonly menuTemplateRepository: Repository<MenuTemplate>,
  ) {}

  async findOne(id: number): Promise<MenuTemplate> {
    try {
      const menuTemplate = await this.menuTemplateRepository.findOneOrFail({
        where: { id },
      });
      return menuTemplate;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<MenuTemplate[]> {
    try {
      return this.menuTemplateRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findAllByIds(id: number[]): Promise<MenuTemplate[]> {
    try {
      return this.menuTemplateRepository.find({
        where: {
          id: In(id),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
