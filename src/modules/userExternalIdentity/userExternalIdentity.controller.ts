import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserExternalIdentityService } from './userExternalIdentity.service';
import { UserExternalIdentity } from './userExternalIdentity.entity';

@Controller('user-external-identities')
export class UserExternalIdentityController {
  constructor(
    private readonly userExternalIdentityService: UserExternalIdentityService,
  ) {}

  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserExternalIdentity | undefined> {
    try {
      const userExternalIdentity =
        await this.userExternalIdentityService.findById(id);

      if (!userExternalIdentity) {
        throw new NotFoundException(
          `UserExternalIdentity with ID ${id} not found`,
        );
      }

      return userExternalIdentity;
    } catch (error) {
      // ToDo: Handle other errors or log them as needed.
      throw new NotFoundException(
        `UserExternalIdentity with ID ${id} not found`,
      );
    }
  }

  @Get()
  public async findAll(@Query('userId', ParseIntPipe) userId?: number) {
    if (userId) {
      return this.userExternalIdentityService.findByUserId(userId);
    }
  }
}
