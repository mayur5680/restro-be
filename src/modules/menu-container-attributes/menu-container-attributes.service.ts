import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuContainerAttributeDto } from './dto/create-menu-container-attribute.dto';
import { UpdateMenuContainerAttributeDto } from './dto/update-menu-container-attribute.dto';
import { MenuContainerAttributes } from './entities/menu-container-attribute.entity';
import { GygLog } from 'src/shared';
import { Loglevel } from 'src/context';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';

@Injectable()
export class MenuContainerAttributesService {
  loger: GygLog;
  constructor(
    @InjectRepository(MenuContainerAttributes)
    private readonly menuContainerAttributesRepository: Repository<MenuContainerAttributes>,
  ) {
    this.loger = new GygLog(MenuContainerAttributesService.name);
  }

  async findAll(
    @CorrelationId() corelation: string,
  ): Promise<MenuContainerAttributes[]> {
    this.loger.writeLog('findAll called', 'findAll', corelation, Loglevel.INFO);
    const result = await this.menuContainerAttributesRepository.find();
    this.loger.writeLog('findAll result', 'findAll', corelation, Loglevel.INFO);
    return result;
  }

  async findOne(
    id: number,
    @CorrelationId() corelation: string,
  ): Promise<MenuContainerAttributes> {
    this.loger.writeLog('findOne called', 'findOne', corelation, Loglevel.INFO);
    const menuContainerAttribute =
      await this.menuContainerAttributesRepository.findOne({
        where: { id },
      });
    if (!menuContainerAttribute) {
      throw new NotFoundException(
        `MenuContainerAttribute with ID ${id} not found`,
      );
    }
    this.loger.writeLog('findOne result', 'findOne', corelation, Loglevel.INFO);
    return menuContainerAttribute;
  }

  async create(
    createMenuContainerAttributeDto: CreateMenuContainerAttributeDto,
    @CorrelationId() corelation: string,
  ): Promise<MenuContainerAttributes> {
    this.loger.writeLog('create called', 'create', corelation, Loglevel.INFO);
    const menuContainerAttribute =
      this.menuContainerAttributesRepository.create({
        ...createMenuContainerAttributeDto,
        menuContainerId: Number(
          createMenuContainerAttributeDto.menuContainerId,
        ),
        posMenuId: Number(createMenuContainerAttributeDto.posMenuId),
      });
    const result = await this.menuContainerAttributesRepository.save(
      menuContainerAttribute,
    );
    this.loger.writeLog('create result', 'create', corelation, Loglevel.INFO);
    return result;
  }

  async update(
    id: number,
    updateMenuContainerAttributeDto: UpdateMenuContainerAttributeDto,
    @CorrelationId() corelation: string,
  ): Promise<MenuContainerAttributes> {
    this.loger.writeLog('update called', 'update', corelation, Loglevel.INFO);
    const menuContainerAttribute =
      await this.menuContainerAttributesRepository.findOne({
        where: { id },
      });
    if (!menuContainerAttribute) {
      throw new NotFoundException(
        `MenuContainerAttribute with ID ${id} not found`,
      );
    }
    const result = await this.menuContainerAttributesRepository.save({
      ...menuContainerAttribute,
      ...updateMenuContainerAttributeDto,
      menuContainerId: Number(updateMenuContainerAttributeDto.menuContainerId),
      posMenuId: Number(updateMenuContainerAttributeDto.posMenuId),
    });
    this.loger.writeLog('update result', 'update', corelation, Loglevel.INFO);
    return result;
  }

  async remove(id: number, corelation: string): Promise<void> {
    this.loger.writeLog('remove called', 'remove', corelation, Loglevel.INFO);
    const menuContainerAttribute =
      await this.menuContainerAttributesRepository.findOne({
        where: { id },
      });
    if (!menuContainerAttribute) {
      throw new NotFoundException(
        `MenuContainerAttribute with ID ${id} not found`,
      );
    }
    const result = await this.menuContainerAttributesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `MenuContainerAttribute with ID ${id} not found`,
      );
    }
    this.loger.writeLog('remove result', 'remove', corelation, Loglevel.INFO);
  }
}
