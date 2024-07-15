import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateService } from './menu-template.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MenuTemplate } from './entities/menu-template.entity';
import { NotFoundException } from '@nestjs/common';

describe('MenuTemplateService', () => {
  let service: MenuTemplateService;
  let repository: Repository<MenuTemplate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuTemplateService,
        {
          provide: getRepositoryToken(MenuTemplate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuTemplateService>(MenuTemplateService);
    repository = module.get<Repository<MenuTemplate>>(
      getRepositoryToken(MenuTemplate),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a menu template', async () => {
      const menuTemplateMock = new MenuTemplate();
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValueOnce(menuTemplateMock);

      const result = await service.findOne(1);

      expect(result).toBe(menuTemplateMock);
    });

    it('should throw NotFoundException if menu template is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of menu templates', async () => {
      const menuTemplatesMock = [new MenuTemplate(), new MenuTemplate()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(menuTemplatesMock);

      const result = await service.findAll();

      expect(result).toEqual(menuTemplatesMock);
    });
  });
});
