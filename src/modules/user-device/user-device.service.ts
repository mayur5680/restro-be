import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDevice } from './entities/user-device.entity';
import { exceptionWrapper } from 'src/shared';

@Injectable()
export class UserDeviceService {
  constructor(
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
  ) {}

  async create(createUserDeviceDto: CreateUserDeviceDto): Promise<UserDevice> {
    try {
      const newUserDevice =
        this.userDeviceRepository.create(createUserDeviceDto);
      return this.userDeviceRepository.save(newUserDevice);
    } catch (error) {
      // Handle database-related errors
      throw new InternalServerErrorException('Failed to create user device');
    }
  }

  async findAll(userId: number): Promise<UserDevice[]> {
    try {
      return this.userDeviceRepository.find({ where: { userId } });
    } catch (error) {
      // Handle database-related errors
      throw new InternalServerErrorException('Failed to retrieve user devices');
    }
  }

  async findOne(id: number): Promise<UserDevice> {
    try {
      const userDevice = await this.userDeviceRepository.findOne({
        where: { id },
      });
      if (!userDevice) {
        throw new NotFoundException(`User device with id ${id} not found`);
      }
      return userDevice;
    } catch (error) {
      // Handle database-related errors and NotFoundException
      if (error instanceof NotFoundException) {
        exceptionWrapper(error);
      }
      throw new InternalServerErrorException('Failed to retrieve user device');
    }
  }

  async update(
    id: number,
    updateUserDeviceDto: UpdateUserDeviceDto,
  ): Promise<UserDevice> {
    try {
      const userDevice = await this.findOne(id);
      Object.assign(userDevice, updateUserDeviceDto);
      return this.userDeviceRepository.save(userDevice);
    } catch (error) {
      // Handle NotFoundException and database-related errors
      throw new InternalServerErrorException('Failed to update user device');
    }
  }

  async remove(id: number): Promise<void> {
    const userDevice = await this.userDeviceRepository.findOne({
      where: { id },
    });
    if (!userDevice) {
      throw new NotFoundException(`User device with id ${id} not found`);
    }
    await this.userDeviceRepository.remove(userDevice);
  }
}
