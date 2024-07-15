import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Resto365UserService } from './resto365-user.service';
import { CreateResto365UserDto } from './dto/create-resto365-user.dto';
import { UpdateResto365UserDto } from './dto/update-resto365-user.dto';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from './entities/resto365-user.entity';
import { Resto365UserResponseDTO } from './dto/resto365-user-response.dto';
import { Resto365RoleResponseDto } from '@modules/resto365-role/resto365-role.dto';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { GygLog } from 'src/shared';
import { CorrelationId } from '@modules/resto365-audit/CorrelationIdDecorator';
import { UUID } from 'crypto';
import { Audit } from '@modules/resto365-audit/AuditDecorator';
import { AuditableResponse } from '@modules/resto365-audit/types';
import { EntitySource } from '@modules/resto365-audit/entities/resto365-audit.entity';
import { AuthService } from '@modules/auth/auth.service';

@Audit('User Management/User')
@Controller('resto365-user')
export class Resto365UserController {
  private readonly logger = new GygLog(Resto365UserController.name);
  constructor(
    private readonly resto365UserService: Resto365UserService,
    private authService: AuthService,
  ) {}
  @Get('me')
  findMe(@User() user: Resto365User): Resto365UserResponseDTO {
    return this.mapUserResponse(user);
  }

  @Acl('create:user-management')
  @UseGuards(AclGuard)
  @Post()
  async create(
    @Body() createResto365UserDto: CreateResto365UserDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ): Promise<AuditableResponse<Resto365UserResponseDTO>> {
    try {
      const createdUser = await this.resto365UserService.create(
        createResto365UserDto,
        user,
        { _metadata: { correlationId, auditUser: user } },
      );

      this.logger.info(
        this.create.name,
        `User ${createdUser.name} created`,
        correlationId,
      );
      return {
        data: this.mapUserResponse(createdUser),
        _metadata: {
          description: `User ${createdUser.name} created`,
          entitySource: EntitySource.User,
          entitySourceId: createdUser.id,
        },
      };
    } catch (error) {
      this.logger.error(this.create.name, error, correlationId);
      if (error instanceof QueryFailedError) {
        const { code } = error.driverError;
        switch (code) {
          case 'ER_DUP_ENTRY':
            throw new ConflictException('User already exists');
          default:
            throw new BadRequestException('Failed to create user');
        }
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Acl('read:user-management')
  @UseGuards(AclGuard)
  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('roleId') roleId: number,
    @Query('page') page: number = 1,
  ) {
    const users = await this.resto365UserService.findAll(name, roleId, page);
    return users.map((u) => this.mapUserResponse(u));
  }

  @Acl('read:user-management')
  @UseGuards(AclGuard)
  @Get('/count')
  async count(@Query('name') name: string, @Query('roleId') roleId: number) {
    return this.resto365UserService.count(name, roleId);
  }

  @Acl('read:user-management')
  @UseGuards(AclGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.resto365UserService.findOne(+id);
    return this.mapUserResponse(user);
  }

  @Acl('update:user-management')
  @UseGuards(AclGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResto365UserDto: UpdateResto365UserDto,
    @User() user: Resto365User,
    @CorrelationId() correlationId: UUID,
  ) {
    try {
      const updatedUser = this.mapUserResponse(
        await this.resto365UserService.update(+id, updateResto365UserDto, {
          _metadata: { auditUser: user, correlationId },
        }),
      );
      this.authService.clearCachedUser(updateResto365UserDto.id);

      this.logger.info(
        this.update.name,
        `User ${updatedUser.name} updated`,
        correlationId,
      );
      return {
        data: updatedUser,
        _metadata: {
          description: `User ${updatedUser.name} updated`,
          entitySource: EntitySource.User,
          entitySourceId: updatedUser.id,
        },
      };
    } catch (error) {
      this.logger.error(this.update.name, error, correlationId);
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException('User not found');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Acl('delete:user-management')
  @UseGuards(AclGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resto365UserService.remove(+id);
  }

  mapUserResponse(user: Resto365User): Resto365UserResponseDTO {
    const resp = new Resto365UserResponseDTO();
    resp.id = user.id;
    resp.email = user.email;
    resp.department = user.department;
    resp.name = user.name;
    resp.phone = user.phone;
    resp.permissions = user.permissions;
    resp.assignedCountries = user.countries
      ? user.countries.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      : [];
    resp.assignedAreas = user.areas
      ? user.areas.map((c) => ({ id: c.id, name: c.name }))
      : [];
    resp.assignedRestaurants = user.restaurants
      ? user.restaurants.map((c) => ({
          id: c.id,
          name: c.shortRestaurantName,
        }))
      : [];
    if (user.role != null) {
      const role = new Resto365RoleResponseDto();
      role.id = user.role.id;
      role.name = user.role.name;
      role.isCustomRole = user.role.isCustomRole;
      role.scope = user.role.scope;
      resp.role = role;
    }

    return resp;
  }
}
