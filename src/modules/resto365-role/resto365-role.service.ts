/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { CreateResto365RoleDto } from './dto/create-resto365-role.dto';
import { UpdateResto365RoleDto } from './dto/update-resto365-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resto365Role, Scope } from './entities/resto365-role.entity';
import { Repository } from 'typeorm';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { AuditParams } from 'src/shared/audit-logs.types';
import { Resto365Permission } from './entities/resto365-permission.entity';
import { Action, Permissions, Subject } from '@modules/auth/types';

@Injectable()
export class Resto365RoleService {
  constructor(
    @InjectRepository(Resto365Role, 'r365')
    private r365RoleRepository: Repository<Resto365Role>,
  ) {}

  async create(
    createResto365RoleDto: CreateResto365RoleDto,
    user: Resto365User,
    auditParams: AuditParams,
  ) {
    const role = new Resto365Role();
    role.name = createResto365RoleDto.name;
    role.scope = Scope.Country; // For v1 custom roles are always country scoped
    role.isCustomRole = true;
    role.permissions = [];
    role.createdBy = user.id;
    for (const [subject, actions] of Object.entries(
      createResto365RoleDto.permissions,
    )) {
      for (const action of actions) {
        const permission = new Resto365Permission();
        permission.subject = subject as Subject;
        permission.action = action as Action;
        permission.createdBy = user.id;
        role.permissions.push({ ...permission, ...auditParams });
      }
    }
    return this.r365RoleRepository.save({ ...role, ...auditParams });
  }

  findAll() {
    return this.r365RoleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.r365RoleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    return {
      id: role.id,
      name: role.name,
      scope: role.scope,
      isCustomRole: role.isCustomRole,
      permissions: mapResto365PermissionToPermissions(role.permissions),
    };
  }

  async update(
    id: number,
    updateResto365RoleDto: UpdateResto365RoleDto,
    user: Resto365User,
    auditParams: AuditParams,
  ) {
    const role = await this.r365RoleRepository.findOneByOrFail({ id });
    if (updateResto365RoleDto.permissions) {
      role.permissions = [];
      for (const [subject, actions] of Object.entries(
        updateResto365RoleDto.permissions,
      )) {
        for (const action of actions) {
          const permission = new Resto365Permission();
          permission.subject = subject as Subject;
          permission.action = action as Action;
          permission.createdBy = user.id;
          role.permissions.push({ ...permission, ...auditParams });
        }
      }
    }
    role.updatedBy = user.id;
    return this.r365RoleRepository.save({ ...role, ...auditParams });
  }

  remove(id: number) {
    return `This action removes a #${id} resto365Role`;
  }
}

function mapResto365PermissionToPermissions(
  permissions: Resto365Permission[],
): Permissions {
  return permissions.reduce((acc, { subject, action }) => {
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(action);
    return acc;
  }, {} as Permissions);
}
