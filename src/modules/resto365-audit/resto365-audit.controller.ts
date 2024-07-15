import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Query,
} from '@nestjs/common';
import { Resto365AuditService } from './resto365-audit.service';
import { EntitySource, Origin } from './entities/resto365-audit.entity';
import { ParseDatePipe } from 'src/shared/parseDatePipe';
import { User } from '@modules/auth/UserDecorator';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

@Controller('resto365-audit')
export class Resto365AuditController {
  constructor(private readonly resto365AuditService: Resto365AuditService) {}

  @Get()
  async findAll(
    @User() user: Resto365User,
    @Query('page') page: number = 1,
    @Query('userId') userId: number,
    @Query('dateFrom', ParseDatePipe) dateFrom: Date,
    @Query('dateTo', ParseDatePipe) dateTo: Date,
    @Query('entitySource') entitySource: EntitySource,
    @Query('entitySourceId') entitySourceId: number,
  ) {
    checkAccess(entitySource, user);
    const entries = await this.resto365AuditService.findAll({
      page,
      origin: Origin.Api,
      dateFrom: dateFrom,
      dateTo: dateTo,
      userId,
      entitySource,
      entitySourceId,
    });
    return entries;
  }

  @Get('/count')
  async count(
    @User() user: Resto365User,
    @Query('userId') userId: number,
    @Query('dateFrom', ParseDatePipe) dateFrom: Date,
    @Query('dateTo', ParseDatePipe) dateTo: Date,
    @Query('entitySource') entitySource: EntitySource,
    @Query('entitySourceId') entitySourceId: number,
  ) {
    checkAccess(entitySource, user);

    const count = await this.resto365AuditService.getCount({
      origin: Origin.Api,
      dateFrom: dateFrom,
      dateTo: dateTo,
      userId,
      entitySource,
      entitySourceId,
    });
    return count;
  }
}

function checkAccess(entitySource: EntitySource, user: Resto365User) {
  switch (entitySource) {
    case EntitySource.Restaurant:
      // TODO: A more specific permission should be used to read audit logs.
      if (!user.hasPermission('read:restaurant')) {
        throw new ForbiddenException(
          'You do not have permission to view restaurant audit logs',
        );
      }
      break;
    default:
      throw new BadRequestException('Invalid entity source');
  }
}
