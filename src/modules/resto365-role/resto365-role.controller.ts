import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Resto365RoleService } from './resto365-role.service';
import { CreateResto365RoleDto } from './dto/create-resto365-role.dto';
import { UpdateResto365RoleDto } from './dto/update-resto365-role.dto';
import { Resto365RoleResponseDto } from './resto365-role.dto';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { User } from '@modules/auth/UserDecorator';
import { UUID } from 'crypto';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { Resto365Role } from './entities/resto365-role.entity';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { GygLog } from 'src/shared';
import { AuthService } from '@modules/auth/auth.service';

@Audit('User Management/Role')
@Controller('resto365-role')
export class Resto365RoleController {
  private readonly logger = new GygLog(Resto365RoleController.name);
  constructor(
    private readonly resto365RoleService: Resto365RoleService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() createResto365RoleDto: CreateResto365RoleDto,
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
  ): Promise<AuditableResponse<Resto365Role>> {
    try {
      const role = await this.resto365RoleService.create(
        createResto365RoleDto,
        user,
        {
          _metadata: {
            correlationId,
            auditUser: user,
          },
        },
      );
      this.logger.info(
        this.create.name,
        `Role ${role.name} created`,
        correlationId,
      );

      return {
        data: role,
        _metadata: {
          entitySource: EntitySource.Role,
          entitySourceId: role.id,
          description: `Role ${role.name} created`,
        },
      };
    } catch (error) {
      this.logger.error(this.create.name, error, correlationId);
      if (error instanceof QueryFailedError) {
        const { code } = error.driverError;
        switch (code) {
          case 'ER_DUP_ENTRY':
            throw new ConflictException('Role already exists');
          default:
            throw new BadRequestException('Role creation failed');
        }
      }
      throw new InternalServerErrorException('Role creation failed');
    }
  }

  @Get()
  async findAll(): Promise<Resto365RoleResponseDto[]> {
    const roles = await this.resto365RoleService.findAll();
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      scope: role.scope,
      isCustomRole: role.isCustomRole,
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resto365RoleService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CorrelationId() correlationId: UUID,
    @User() user: Resto365User,
    @Body() updateResto365RoleDto: UpdateResto365RoleDto,
  ) {
    try {
      const role = await this.resto365RoleService.update(
        +id,
        updateResto365RoleDto,
        user,
        {
          _metadata: {
            correlationId,
            auditUser: user,
          },
        },
      );
      this.authService.clearCachedRole(role.id);
      this.logger.info(
        this.update.name,
        `Role ${role.name} updated`,
        correlationId,
      );

      return {
        data: role,
        _metadata: {
          entitySource: EntitySource.Role,
          entitySourceId: role.id,
          description: `Role ${role.name} updated`,
        },
      };
    } catch (error) {
      this.logger.error(this.create.name, error, correlationId);
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException('Role not found');
      }
      throw new InternalServerErrorException('Failed to update role');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resto365RoleService.remove(+id);
  }
}
