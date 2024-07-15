import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserIdentityService } from './userIdentity.service';
import { exceptionWrapper } from 'src/shared';

@Controller('user-identity')
export class UserIdentityController {
  constructor(private readonly userIdentityService: UserIdentityService) {}

  @Get()
  public async findAll(@Query('userId') userId: number) {
    if (userId) {
      // Handle the case for orders?userId={userId}
      return this.userIdentityService.findByUserId(userId);
    } else {
      return this.userIdentityService.findAll();
    }
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    return this.userIdentityService.findById(id);
  }

  @Get('providers/groupByIdentityProvider')
  public async groupByIdentityProvider() {
    try {
      const groupedIdentities =
        await this.userIdentityService.groupByIdentityProvider();
      return groupedIdentities;
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
