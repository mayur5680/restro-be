import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePosMenuDto } from './dto/create-pos-menu.dto';
import { UpdatePosMenuDto } from './dto/update-pos-menu.dto';
import { PosMenu } from './entities/pos-menu.entity';

@Injectable()
export class PosMenuService {
  constructor(
    @InjectRepository(PosMenu)
    private readonly posMenuRepository: Repository<PosMenu>,
  ) {}

  async findAll(): Promise<PosMenu[]> {
    return this.posMenuRepository.find();
  }

  async findOne(id: number): Promise<PosMenu> {
    const posMenu = await this.posMenuRepository.findOne({
      where: { id },
    });
    if (!posMenu) {
      throw new NotFoundException(`PosMenu with ID ${id} not found`);
    }
    return posMenu;
  }

  async create(createPosMenuDto: CreatePosMenuDto): Promise<PosMenu> {
    const posMenu = this.posMenuRepository.create(createPosMenuDto);
    return this.posMenuRepository.save(posMenu);
  }

  async update(
    id: number,
    updatePosMenuDto: UpdatePosMenuDto,
  ): Promise<PosMenu> {
    const posMenu = await this.findOne(id);
    // Update only provided fields
    Object.assign(posMenu, updatePosMenuDto);
    return this.posMenuRepository.save(posMenu);
  }

  async remove(id: number): Promise<void> {
    const posMenu = await this.findOne(id);
    await this.posMenuRepository.remove(posMenu);
  }
}
