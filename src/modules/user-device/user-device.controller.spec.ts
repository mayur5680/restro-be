import { Test, TestingModule } from '@nestjs/testing';
import { UserDeviceController } from './user-device.controller';
import { UserDeviceService } from './user-device.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDevice } from './entities/user-device.entity';

describe('UserDeviceController', () => {
  let controller: UserDeviceController;
  let service: UserDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDeviceController],
      providers: [
        UserDeviceService,
        {
          provide: getRepositoryToken(UserDevice),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserDeviceController>(UserDeviceController);
    service = module.get<UserDeviceService>(UserDeviceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user device', async () => {
      const dto: CreateUserDeviceDto = {
        userId: 1,
        email: 'testUser@test.com',
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(service, 'create').mockResolvedValueOnce(dto as any);
      expect(await controller.create(dto)).toBe(dto);
    });

    it('should throw InternalServerErrorException when service fails to create user device', async () => {
      const dto: CreateUserDeviceDto = {
        userId: 1,
        email: 'testUser@test.com',
      };
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new InternalServerErrorException());
      await expect(controller.create(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of user devices', async () => {
      const userId = 1;
      const userDevices = [new UserDevice(), new UserDevice()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(userDevices);
      expect(await controller.findAll(userId)).toBe(userDevices);
    });

    it('should throw InternalServerErrorException when service fails to retrieve user devices', async () => {
      const userId = 1;
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new InternalServerErrorException());
      await expect(controller.findAll(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user device by ID', async () => {
      const id = 1;
      const userDevice = new UserDevice();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(userDevice);
      expect(await controller.findOne(id)).toBe(userDevice);
    });

    it('should throw NotFoundException when user device is not found', async () => {
      const id = 1;
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException when service fails to retrieve user device', async () => {
      const id = 1;
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new InternalServerErrorException());
      await expect(controller.findOne(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    return it('should update a user device', async () => {
      const id = 1;
      const dto: UpdateUserDeviceDto = {
        email: 'testUser@test.com',
      };
      const userDevice = new UserDevice();
      jest.spyOn(service, 'update').mockResolvedValueOnce(userDevice);
      expect(await controller.update(id, dto)).toBe(userDevice);
    });
  });

  describe('remove', () => {
    it('should remove a user device', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);
      expect(await controller.remove(id)).toBeUndefined();
    });
  });
});
