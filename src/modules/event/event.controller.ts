import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CalenderThemeColor } from 'src/context';
import { exceptionWrapper } from 'src/shared';

@Controller('event')
export class EventController {
  @Get()
  @Acl('read:menu')
  @UseGuards(AclGuard)
  @ApiOperation({ summary: `get event` })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async generateMenuByStoreId() {
    try {
      return {
        tradinghours: CalenderThemeColor.PRIMARY,
      };
    } catch (error) {
      exceptionWrapper(error);
    }
  }
}
