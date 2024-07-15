import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Query,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDeviceService } from './user-device.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserDevice } from './entities/user-device.entity';
import { exceptionWrapper } from 'src/shared';

@Controller('user-devices')
export class UserDeviceController {
  constructor(private readonly userDeviceService: UserDeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user device' })
  @ApiBody({
    type: CreateUserDeviceDto,
    description: 'Create data for the user device',
  })
  @ApiResponse({ status: 201, description: 'Created', type: UserDevice })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createUserDeviceDto: CreateUserDeviceDto) {
    try {
      return this.userDeviceService.create(createUserDeviceDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user device');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all user devices' })
  @ApiResponse({ status: 200, description: 'OK', type: [UserDevice] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(@Query('user', ParseIntPipe) userId: number) {
    try {
      return this.userDeviceService.findAll(userId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user devices');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user device by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User device ID' })
  @ApiResponse({ status: 200, description: 'OK', type: UserDevice })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userDeviceService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        exceptionWrapper(error);
      }
      throw new InternalServerErrorException('Failed to retrieve user device');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user device by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User device ID' })
  @ApiBody({
    type: UpdateUserDeviceDto,
    description: 'Update data for the user device',
  })
  @ApiResponse({ status: 200, description: 'OK', type: UserDevice })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDeviceDto: UpdateUserDeviceDto,
  ) {
    try {
      return this.userDeviceService.update(id, updateUserDeviceDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        exceptionWrapper(error);
      }
      throw new InternalServerErrorException('Failed to update user device');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user device by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User device ID' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userDeviceService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        exceptionWrapper(error);
      }
      throw new InternalServerErrorException('Failed to remove user device');
    }
  }
}
