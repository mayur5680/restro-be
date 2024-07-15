import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateController } from './menu-template.controller';
import { MenuTemplateService } from './menu-template.service';
import { MenuTemplate } from './entities/menu-template.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MenuTemplateController', () => {
  let controller: MenuTemplateController;
  let service: MenuTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTemplateController],
      providers: [
        MenuTemplateService,
        {
          provide: getRepositoryToken(MenuTemplate),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuTemplateController>(MenuTemplateController);
    service = module.get<MenuTemplateService>(MenuTemplateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a menu template', async () => {
      const menuTemplateMock = new MenuTemplate();
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(menuTemplateMock);

      const result = await controller.findOne('1');

      expect(result).toBe(menuTemplateMock);
    });

    it('should throw NotFoundException if menu template is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of menu templates', async () => {
      const menuTemplatesMock = [new MenuTemplate(), new MenuTemplate()];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(menuTemplatesMock);

      const result = await controller.findAll();

      expect(result).toEqual(menuTemplatesMock);
    });
  });
});
