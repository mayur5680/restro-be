import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PosMenuController } from './pos-menu.controller';
import { PosMenuService } from './pos-menu.service';
import { PosMenu } from './entities/pos-menu.entity';
import { CreatePosMenuDto } from './dto/create-pos-menu.dto';
import { UpdatePosMenuDto } from './dto/update-pos-menu.dto';
import { NotFoundException } from '@nestjs/common';
import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';

describe('PosMenuController', () => {
  let controller: PosMenuController;
  let service: PosMenuService;

  const mockCreateDto: CreatePosMenuDto = {
    name: 'Test Menu',
    description: 'Test Description',
    storeId: 1,
    tier: 1,
    type: 'test',
    createdBy: 1,
    updatedBy: 1,
  };

  const mockUpdateDto: UpdatePosMenuDto = {
    name: 'Test Menu',
    description: 'Test Description',
    storeId: 1,
    tier: 1,
    type: 'test',
    updatedBy: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosMenuController],
      providers: [
        PosMenuService,
        {
          provide: getRepositoryToken(PosMenu),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PosMenuController>(PosMenuController);
    service = module.get<PosMenuService>(PosMenuService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of PosMenu', async () => {
      const mockMenus = [new PosMenu()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockMenus);

      expect(await controller.findAll('corelationId')).toBe(mockMenus);
    });

    it('should return an empty array if no PosMenu are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

      expect(await controller.findAll('corelationId')).toEqual([]);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      await expect(controller.findAll('corelationId')).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a PosMenu', async () => {
      const mockMenu = new PosMenu();
      mockMenu.id = 1;
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockMenu);

      expect(await controller.findOne('1', 'corelationId')).toBe(mockMenu);
    });

    it('should throw an error if PosMenu is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await controller.findOne('1', 'corelationId');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      await expect(
        controller.findOne('1', 'corelationId'),
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a PosMenu', async () => {
      const mockMenu = new PosMenu();
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockMenu);

      expect(
        await controller.create(
          mockCreateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).toBe(mockMenu);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(
        controller.create(
          mockCreateDto,
          'corelationId',
          1 as unknown as Resto365User,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a PosMenu', async () => {
      const mockMenu = new PosMenu();
      jest.spyOn(service, 'update').mockResolvedValueOnce(mockMenu);

      expect(await controller.update('1', mockUpdateDto)).toBe(mockMenu);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(
        controller.update('1', mockUpdateDto),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a PosMenu', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);

      await controller.remove('1');
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      await expect(controller.remove('1')).rejects.toThrowError();
    });
  });
});
