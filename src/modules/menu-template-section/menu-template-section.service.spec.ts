import { Test, TestingModule } from '@nestjs/testing';
import { MenuTemplateSectionService } from './menu-template-section.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuTemplateSectionDto } from './dto/create-menu-template-section.dto';
import { MenuTemplateSection } from './entities/menu-template-section.entity';
import { NotFoundException } from '@nestjs/common';

describe('MenuTemplateSectionService', () => {
  let service: MenuTemplateSectionService;
  let repository: Repository<MenuTemplateSection>;

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
      providers: [
        MenuTemplateSectionService,
        {
          provide: getRepositoryToken(MenuTemplateSection),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenuTemplateSectionService>(
      MenuTemplateSectionService,
    );
    repository = module.get<Repository<MenuTemplateSection>>(
      getRepositoryToken(MenuTemplateSection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu template section', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockCreateDto as MenuTemplateSection);

      const result = await service.create(mockCreateDto);
      expect(result).toEqual(mockCreateDto);
    });
  });

  describe('findById', () => {
    it('should return a menu template section by ID', async () => {
      const mockMenuTemplateSection = new MenuTemplateSection();
      mockMenuTemplateSection.id = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockMenuTemplateSection);

      const result = await service.findById(1);
      expect(result).toEqual(mockMenuTemplateSection);
    });

    it('should return undefined if menu template section is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findById(1);
      expect(result).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of menu template sections', async () => {
      const mockMenuTemplateSections = [new MenuTemplateSection()];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSections);

      const result = await service.findAll();
      expect(result).toEqual(mockMenuTemplateSections);
    });
  });

  describe('findAllBySectionId', () => {
    it('should return an array of menu template sections by section ID', async () => {
      const mockMenuTemplateSections = [new MenuTemplateSection()];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockMenuTemplateSections);

      const result = await service.findAllBySectionId(1);
      expect(result).toEqual(mockMenuTemplateSections);
    });
  });

  describe('update', () => {
    it('should update a menu template section by ID', async () => {
      const mockMenuTemplateSection = new MenuTemplateSection();
      mockMenuTemplateSection.id = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockMenuTemplateSection);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockCreateDto as MenuTemplateSection);

      const result = await service.update(1, mockCreateDto);
      expect(result).toEqual(mockCreateDto);
    });

    it('should throw NotFoundException if menu template section is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(1, mockCreateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a menu template section by ID', async () => {
      const mockMenuTemplateSection = new MenuTemplateSection();
      mockMenuTemplateSection.id = 1;
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockMenuTemplateSection);
      jest
        .spyOn(repository, 'remove')
        .mockResolvedValue({} as MenuTemplateSection);

      await service.remove(1);
      expect(repository.remove).toHaveBeenCalledWith(mockMenuTemplateSection);
    });

    it('should throw NotFoundException if menu template section is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
