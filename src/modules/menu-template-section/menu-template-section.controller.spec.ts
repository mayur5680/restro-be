import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateSectionController } from './menu-template-section.controller';
import { MenuTemplateSectionService } from './menu-template-section.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuTemplateSectionDto } from './dto/create-menu-template-section.dto';
import { MenuTemplateSection } from './entities/menu-template-section.entity';
import { NotFoundException } from '@nestjs/common';

describe('MenuTemplateSectionController', () => {
  let controller: MenuTemplateSectionController;
  let service: MenuTemplateSectionService;

  const mockCreateDto: CreateMenuTemplateSectionDto = {
    menuTemplateId: 1,
    sectionId: 1,
    createdBy: 1,
    updatedBy: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTemplateSectionController],
      providers: [
        MenuTemplateSectionService,
        {
          provide: getRepositoryToken(MenuTemplateSection),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MenuTemplateSectionController>(
      MenuTemplateSectionController,
    );
    service = module.get<MenuTemplateSectionService>(
      MenuTemplateSectionService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu template section', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockCreateDto as MenuTemplateSection);

      const result = await controller.create(mockCreateDto);
      expect(result).toEqual(mockCreateDto);
    });
  });

  describe('findById', () => {
    it('should return a menu template section by ID', async () => {
      const mockMenuTemplateSection = new MenuTemplateSection();
      mockMenuTemplateSection.id = 1;
      jest
        .spyOn(service, 'findById')
        .mockResolvedValue(mockMenuTemplateSection);

      const result = await controller.findById(1);
      expect(result).toEqual(mockMenuTemplateSection);
    });
  });

  describe('findAll', () => {
    it('should return an array of menu template sections', async () => {
      const mockMenuTemplateSections = [new MenuTemplateSection()];
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockMenuTemplateSections);

      const result = await controller.findAll();
      expect(result).toEqual(mockMenuTemplateSections);
    });
  });

  describe('findAllBySectionId', () => {
    it('should return an array of menu template sections by section ID', async () => {
      const mockMenuTemplateSections = [new MenuTemplateSection()];
      jest
        .spyOn(service, 'findAllBySectionId')
        .mockResolvedValue(mockMenuTemplateSections);

      const result = await controller.findAllBySectionId(1);
      expect(result).toEqual(mockMenuTemplateSections);
    });
  });

  describe('update', () => {
    it('should update a menu template section by ID', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockCreateDto as MenuTemplateSection);

      const result = await controller.update(1, mockCreateDto);
      expect(result).toEqual(mockCreateDto);
    });

    it('should throw NotFoundException if menu template section is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(1, mockCreateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a menu template section by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if menu template section is not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
