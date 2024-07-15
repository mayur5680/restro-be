import { Test, TestingModule } from '@nestjs/testing';
import { UserDeviceService } from './user-device.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDevice } from './entities/user-device.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';

describe('UserDeviceService', () => {
  let service: UserDeviceService;
  let repository: Repository<UserDevice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDeviceService,
        {
          provide: getRepositoryToken(UserDevice),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserDeviceService>(UserDeviceService);
    repository = module.get<Repository<UserDevice>>(
      getRepositoryToken(UserDevice),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user device', async () => {
      const createUserDeviceDto: CreateUserDeviceDto = {
        userId: 0,
        email: 'testUser@test.com',
      };
      const userDevice = new UserDevice();
      jest.spyOn(repository, 'create').mockReturnValue(userDevice);
      jest.spyOn(repository, 'save').mockResolvedValue(userDevice);

      const result = await service.create(createUserDeviceDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDeviceDto);
      expect(repository.save).toHaveBeenCalledWith(userDevice);
      expect(result).toEqual(userDevice);
    });
  });

  describe('findAll', () => {
    it('should return an array of user devices', async () => {
      const userId = 1;
      const userDevices = [new UserDevice(), new UserDevice()];
      jest.spyOn(repository, 'find').mockResolvedValue(userDevices);

      const result = await service.findAll(userId);

      expect(repository.find).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(userDevices);
    });
  });

  describe('findOne', () => {
    it('should return a user device by ID', async () => {
      const id = 1;
      const userDevice = new UserDevice();
      jest.spyOn(repository, 'findOne').mockResolvedValue(userDevice);

      const result = await service.findOne(id);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(userDevice);
    });

    it('should throw NotFoundException if user device is not found', async () => {
      const id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      expect(service.findOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user device', async () => {
      const id = 1;
      const updateUserDeviceDto: UpdateUserDeviceDto = {
        userId: 0,
        email: 'testUser@test.com',
      };
      const userDevice = new UserDevice();
      jest.spyOn(service, 'findOne').mockResolvedValue(userDevice);
      jest.spyOn(repository, 'save').mockResolvedValue(userDevice);

      const result = await service.update(id, updateUserDeviceDto);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(repository.save).toHaveBeenCalledWith(userDevice);
      expect(result).toEqual(userDevice);
    });
  });

  describe('remove', () => {
    it('should remove a user device', async () => {
      const id = 1;
      const userDevice = new UserDevice();
      jest.spyOn(repository, 'findOne').mockResolvedValue(userDevice);
      jest.spyOn(repository, 'remove').mockResolvedValue(userDevice);

      await service.remove(id);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(repository.remove).toHaveBeenCalledWith(userDevice);
    });

    it('should throw NotFoundException if user device is not found', async () => {
      const id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      expect(service.remove(id)).rejects.toThrowError(NotFoundException);
    });
  });
});
