import { Injectable, NotFoundException } from '@nestjs/common';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  public async findOne(id: number): Promise<Group> {
    return this.groupRepository
      .findOneOrFail({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException(`Group not found`);
      });
  }

  public async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }
}
