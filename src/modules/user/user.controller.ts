import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserService } from './user.service';
import { ParseNonEmptyStringPipe } from './user.controller.pipe';
import {
  UserSearchResponseDTO,
  UserDetailResponseDTO,
  UserUpdateDTO,
  UserBlockDTO,
} from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('registration-stats')
  public async getRegistrationStatsLast30Days() {
    const registrationStats =
      await this.userService.getRegistrationStatsLast30Days();

    return registrationStats;
  }

  @Get('deletion-stats')
  public async getDeletedAcountsStatsLast30Days() {
    const deletionStats =
      await this.userService.getDeletedAcountsStatsLast30Days();

    return deletionStats;
  }

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Get('search')
  public async search(@Query('query', ParseNonEmptyStringPipe) query: string) {
    const users = await this.userService.search(query);
    return users.map((user) => {
      const dto = new UserSearchResponseDTO();
      dto.id = user.id;
      dto.username = user.username;
      dto.email = user.email;
      dto.firstName = user.firstName;
      dto.lastName = user.lastName;
      dto.mobile = user.mobile;
      dto.isActive = user.isActive;
      dto.isBlocked = user.isBlocked;
      dto.blockedReason = user.blockedReason;
      return dto;
    });
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserDetailResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UserUpdateDTO,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return plainToInstance(UserDetailResponseDTO, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/block')
  public async blockUser(
    @Param('id') id: number,
    @Body() blockUserDto: UserBlockDTO,
  ) {
    const blockedUser = await this.userService.blockUser(id, blockUserDto);
    return plainToInstance(UserDetailResponseDTO, blockedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/unblock')
  public async unblockUser(@Param('id') id: number) {
    const unblockedUser = await this.userService.unblockUser(id);
    return plainToInstance(UserDetailResponseDTO, unblockedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number) {
    const deletedUser = await this.userService.deleteUser(id);
    return plainToInstance(UserDetailResponseDTO, deletedUser, {
      excludeExtraneousValues: true,
    });
  }
}
