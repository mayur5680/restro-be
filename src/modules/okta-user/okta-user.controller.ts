import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OktaUserService } from './okta-user.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Acl } from '@modules/auth/AclDecorator';
import { AclGuard } from '@modules/auth/AclGuard';
class OktaUserControllerResponse {
  id: string;
  status: string;
  name: string;
  organization: string;
  email: string;
}

@Controller('okta-user')
export class OktaUserController {
  constructor(private readonly oktaUsersService: OktaUserService) {}

  @UseGuards(AclGuard)
  @Acl('read:user-management')
  @Get()
  @ApiQuery({ name: 'query', type: String })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: OktaUserControllerResponse,
    isArray: true,
  })
  async find(@Query('q') email: string): Promise<OktaUserControllerResponse[]> {
    const resp = await this.oktaUsersService.findByEmail(email);
    if (resp) {
      return resp
        .filter((u) => u.profile.email.match(/gyg.com$|gyg.com.au$/))
        .map((user) => ({
          id: user.id,
          status: user.status,
          name: user.profile.displayName,
          organization: user.profile.organization,
          email: user.profile.email,
        }));
    }
  }
}
